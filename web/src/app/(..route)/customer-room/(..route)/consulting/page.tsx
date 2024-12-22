"use client";

import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { VideoSettingDialog } from "@/app/ui/consulting-room/modal/video-setting";
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon } from "lucide-react";
import { useSocket } from "@/app/utils/web-socket/useSocket";
import { Video, VideoView } from "../../components/video-view";
import { createMockMyProfile, mockOtherProfile, mockProfile } from "../../mock/mock-profiles";
import { ApplicationForm, ApplicationProps } from "../../components/application-form";
import { ReviewDialog } from "@/app/ui/consulting-room/modal/review-dialog";
import { SharingLinkDialog } from "@/app/ui/consulting-room/modal/share-link-dialog";
import { getApplicationFormById } from "@/app/business/consulting-room/application-form.service";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";
import { uploadFileToNcloud } from "@/app/utils/http/ncloudStorage";
import { saveAs } from "file-saver";

export default function Home() {
  // 현재 내 모습을 보여주는 MediaStream
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  // application form
  const [isForm, setIsForm] = useState<boolean>(false);

  // rtc
  const { client, video } = useSocket();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [formData, setFormData] = useState<ApplicationProps | null>(null);

  // (전역 상태 관리) consulting-room data
  const { customerIds, tellerId, updateCustomer, updateTeller } = useConsultingRoomStore(
    (state) => state,
  );

  // test
  useEffect(() => {
    const handleUpdate = () => {
      updateCustomer("updatedCustomer");
      updateTeller("updatedTeller");
    };

    setTimeout(() => {
      handleUpdate();
      console.log("customer-id", customerIds);
      console.log("teller-id", tellerId);
    }, 1000);
  }, []);

  // 녹음 시작
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("마이크 스트림 가져오기 성공");
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          console.log("녹음 데이터 수신 중");
          setAudioChunks((prev) => [...prev, event.data]);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
        console.log("녹음 시작");
      })
      .catch((error) => {
        console.error("녹음 시작 실패:", error);
      });

    return () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
    };
  }, []);

  const stopAndUploadRecording = async () => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
      console.warn("녹음 중지 실패: mediaRecorder가 초기화되지 않았거나 이미 중지됨");
      return;
    }

    if (audioChunks.length === 0) {
      console.warn("녹음 데이터가 부족합니다. 최소한 1초간 녹음을 시작합니다.");

      // 강제 짧은 녹음 실행
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const shortRecorder = new MediaRecorder(stream);
        const shortChunks: Blob[] = [];

        shortRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            shortChunks.push(event.data);
          }
        };

        shortRecorder.start();
        console.log("10초 동안 강제 녹음 시작...");

        await new Promise<void>((resolve) => {
          setTimeout(() => {
            shortRecorder.stop();
            shortRecorder.onstop = () => resolve();
          }, 10000); // 10초 강제 녹음
        });

        const completeBlob = new Blob(shortChunks, { type: "audio/wav" });
        saveAs(completeBlob, "forced_audio.wav");
        console.log("강제 녹음된 오디오 파일이 생성되었습니다.");
      } catch (error) {
        console.error("강제 녹음 실패:", error);
        alert("강제 녹음 중 오류 발생");
      }
      return;
    }

    mediaRecorder.stop();
    setIsRecording(false);

    const completeBlob = new Blob(audioChunks, { type: "audio/wav" });
    setAudioChunks([]);

    try {
      const uploadedUrl = await uploadFileToNcloud(completeBlob, "consulting_audio.wav");
      console.log("녹음 파일 업로드 성공:", uploadedUrl);
      alert(`녹음 파일 업로드 성공: ${uploadedUrl}`);
    } catch (error) {
      console.error("녹음 파일 업로드 실패:", error);
      alert("녹음 파일 업로드 실패");
    }
  };

  // 상단 인덱싱
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const handleNext = () => {
    if (slideIndex < videoViews.length - 3) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const videoViews: JSX.Element[] = Array(5).fill(
    <VideoView
      isTop={true}
      video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>} />}
      onCam={false}
      profile={mockOtherProfile}
    />,
  );

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 800, height: 450, facingMode: "user" },
        });
        setVideoStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        audioContext.current = new window.AudioContext();
        gainNode.current = audioContext.current.createGain();
      } catch (error) {
        throw new Error(error as string);
      }
    };

    getMedia();

    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, [isVideoEnabled]);

  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoStream]);

  useEffect(() => {
    if (client) {
      client.activate();
      console.log("Activating STOMP client...");

      return () => {
        console.log("Deactivating STOMP client...");
        client.deactivate();
      };
    }
  }, [client]);

  useEffect(() => {
    getApplicationFormById("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d").then((value) => {
      setFormData(value.data as ApplicationProps);
    });
  }, [isForm]);

  const toggleVideo = () => {
    if (videoStream) {
      videoStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (videoStream) {
      videoStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <main>
      <div>
        <div className="relative w-full overflow-hidden h-1/6 p-6 bg-slate-100">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${(slideIndex * 100) / 3}%)` }}
          >
            <div className="w-1/3 flex-shrink-0">
              <VideoView
                video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>} isTop={true} />}
                onCam={isVideoEnabled}
                isTop={true}
                profile={createMockMyProfile(true)}
              />
            </div>
            {videoViews.map((videoView, index) => (
              <div key={index} className="w-1/3 flex-shrink-0">
                {videoView}
              </div>
            ))}
          </div>
          {slideIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 px-3"
            >
              <SlArrowLeft />
            </button>
          )}
          {slideIndex < videoViews.length - 3 && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3"
            >
              <SlArrowRight />
            </button>
          )}
        </div>
        <div className="flex justify-center items-center gap-4 pt-4">
          <AchromaticButton
            onClick={() => {
              setIsForm(true);
            }}
          >
            mock form
          </AchromaticButton>
          <AchromaticButton
            onClick={() => {
              setIsForm(false);
            }}
          >
            mock view
          </AchromaticButton>
        </div>
        <div className="pt-4 px-6">
          {isForm ? (
            <ApplicationForm formData={formData} />
          ) : (
            <VideoView video={video[0]} onCam={true} profile={mockProfile} />
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex justify-center gap-4">
          <AchromaticButton
            onClick={toggleAudio}
            className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"
          >
            <div className="p-2">
              {isAudioEnabled ? (
                <MicIcon color="black" size={20} />
              ) : (
                <MicOffIcon color="black" size={20} />
              )}
            </div>
          </AchromaticButton>
          <AchromaticButton
            onClick={toggleVideo}
            className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"
          >
            <div className="p-2">
              {isVideoEnabled ? (
                <VideoIcon color="black" size={20} />
              ) : (
                <VideoOffIcon color="black" size={20} />
              )}
            </div>
          </AchromaticButton>
          <ReviewDialog stopAndUploadRecording={stopAndUploadRecording} />
          <SharingLinkDialog />
          <VideoSettingDialog videoRef={videoRef} />
        </div>
      </div>
    </main>
  );
}
