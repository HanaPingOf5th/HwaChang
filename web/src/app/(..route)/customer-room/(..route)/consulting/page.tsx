"use client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { VideoSettingDialog } from "@/app/ui/consulting-room/modal/video-setting";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { useSocket } from "@/app/utils/web-socket/useSocket";
import { Video, VideoView } from "../../components/video-view";
import { createMockMyProfile, mockOtherProfile, mockProfile } from "../../mock/mock-profiles";
import { ApplicationForm, ApplicationProps } from "../../components/application-form";
import { ReviewDialog } from "@/app/ui/consulting-room/modal/review-dialog";
import { SharingLinkDialog } from "@/app/ui/consulting-room/modal/share-link-dialog";
import { getApplicationFormById } from "@/app/business/consulting-room/application-form.service";

export default function Home() {
  // 현재 내 모습을 보여주는 MediaStram
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  // application form
  const [isForm, setIsForm] = useState<boolean>(false);

  // rtc
  const { client, video } = useSocket();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [formData, setFormData] = useState<ApplicationProps | null>(null);

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

  useEffect(()=>{
    getApplicationFormById("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d").then((value)=>{
      setFormData(value.data as ApplicationProps)
    })
  }, [isForm])
  
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
        <div className="relative w-full overflow-hidden h-1/6 p-6 bg-slate-100">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${(slideIndex * 100) / 3}%)`}}>
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
        {/* API 연동 후, 삭제 예정 */}
        <div className="flex justify-center items-center gap-4 pt-4">
          <AchromaticButton onClick={() => { setIsForm(true);}}>
             mock form
          </AchromaticButton>
          <AchromaticButton onClick={() => {setIsForm(false);}}>
            mock view
          </AchromaticButton>
        </div>
        <div className="pt-4 px-6">
          {isForm ? (<ApplicationForm formData={formData} />) : ( <VideoView video={video[0]} onCam={true} profile={mockProfile}/>)}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex justify-center gap-4">
          <AchromaticButton
            onClick={toggleAudio}
            className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"
          >
            <div className="p-2">
              {isAudioEnabled ? (<MicIcon color="black" size={20} />) : (<MicOffIcon color="black" size={20} />)}
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
          <ReviewDialog/>
          <SharingLinkDialog/>
          <VideoSettingDialog videoRef={videoRef}/>
        </div>
      </div>
    </main>
  );
}
