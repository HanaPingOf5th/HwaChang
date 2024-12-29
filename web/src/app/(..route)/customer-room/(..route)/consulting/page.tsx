"use client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon } from "lucide-react";
import { useSocket } from "@/app/utils/web-socket/useSocket";
import { Video, VideoView } from "../../components/video-view";
import { createMockMyProfile, mockProfile } from "../../mock/mock-profiles";
import { ApplicationForm, ApplicationProps } from "../../components/application-form";
import { ReviewDialog } from "@/app/ui/consulting-room/modal/review-dialog";
import { getApplicationForm} from "@/app/business/consulting-room/application-form.service";
import { useRecorder } from "@/app/utils/web-socket/use-recorder";
import { useSearchParams } from "next/navigation";
import { RecordAndUploadButton } from "@/app/ui/consulting-room/modal/record-upload-button";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";

export default function Home() {
  const params = useSearchParams();
  const roomId:string = params.get("roomId");

  // 현재 내 모습을 보여주는 MediaStram
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isMediaReady, setIsMediaReady] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const myKey = `${roomId}customer`

  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  // application form
  const [isForm, setIsForm] = useState<boolean>(false);

  // rtc
  const { client, video, remoteStream, pcListMap } = useSocket({id: roomId, myKey:myKey});
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [formData, setFormData] = useState<ApplicationProps | null>(null);

  // 녹화
  const { startRecord, getAudioPermission, stopAndUpload } =
    useRecorder(remoteStream);

  // 현재 접속한 고객의 이름
  const customerName = useConsultingRoomStore((state) => state.customerName);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 800, height: 450 },
        });
        setVideoStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        audioContext.current = new window.AudioContext();
        gainNode.current = audioContext.current.createGain();
        setIsMediaReady(true);
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
    const setupRecording = async () => {
      if (isMediaReady && remoteStream) {
        try {
          await getAudioPermission();
          startRecord();
        } catch (error) {
          console.error("Error during recording setup:", error);
        }
      }
    };

    setupRecording();
  }, [isMediaReady, remoteStream]);

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
  }, [client, roomId]);

  useEffect(() => {
    getApplicationForm().then((value) => {
      setFormData(value.data as ApplicationProps);
    });
  }, [isForm]);

  useEffect(() => {
    return () => {
      pcListMap.forEach((pc) => pc.close());
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoStream]);

  // To-Do: 내가 비디오를 끌 경우, 나의 비디오 상태를 상대방에게 보내는 api 추가: isCam: false
  const toggleVideo = () => {
    if (videoStream) {
      videoStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  // To-Do: 내가 오디오를 끌 경우, 나의 오디오 상태를 상대방에게 보내는 api 추가: isCam: false
  const toggleAudio = () => {
    if (videoStream) {
      videoStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <main>
      <div>
        <div className="relative w-full overflow-hidden h-1/6 p-6">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-0%)`}}>
            <div className="w-1/3 flex-shrink-0">
              <VideoView
                video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>} isTop={true} />}
                onCam={isVideoEnabled}
                isTop={true}
                profile={createMockMyProfile(true, customerName)}
              />
            </div>
          </div>
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
          <RecordAndUploadButton stopAndUpload={stopAndUpload}/>
          <ReviewDialog/>
          <AchromaticButton
            className="bg-hwachang-darkgreen hover:bg-hwachang-hanagreen"
            onClick={() => {
              if(isForm){
                setIsForm(false);
              }else{
                setIsForm(true);
              }
            }}
          >
            신청서 확인
          </AchromaticButton>
        </div>
      </div>
    </main>
  );
}
