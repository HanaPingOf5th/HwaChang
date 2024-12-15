"use client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/component/molecule/dialog/dialog";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { VideoSettingModal } from "@/app/ui/consulting-room/modal/video-setting";
import { SharingLinkModal } from "@/app/ui/consulting-room/modal/sharing-link";
import {
  MicIcon,
  MicOffIcon,
  SettingsIcon,
  Share2Icon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { useSocket } from "@/app/utils/web-socket/useSocket";
import { ReviewModal } from "@/app/ui/consulting-room/modal/review-modal";
import { Video, VideoView } from "@/app/(..route)/customer-room/components/video-view";
import { createMockMyProfile, mockOtherProfile, mockProfile } from "@/app/(..route)/customer-room/mock/mock-profiles";

export default function Home() {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);

  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const modalBackground = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const { client, video, startStream } = useSocket();
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const toggleLink = () => {
    setIsModalOpen(!isModalOpen);
    setIsLinkModalOpen(!isLinkModalOpen);
  };

  const toggleSettings = () => {
    setIsModalOpen(!isModalOpen);
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  const handleStartStream = () => {
    client.activate();
    setTimeout(()=>{
      if (client.connected) {
        startStream();
      } else {
        console.log("WebSocket 연결이 아직 완료되지 않았습니다.");
      }
    }, 1000)
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
        {/* 상대 화면이 송출되는 부분 */}
        <div className="pt-4 px-6">
          <VideoView video={video[0]} onCam={true} profile={mockProfile}/>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <AchromaticButton type="button" onClick={()=>{handleStartStream()}}>상담 시작</AchromaticButton>

        {/* 모달 영역 */}
        {isModalOpen && (
          <div
            ref={modalBackground}
            className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-10"
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                setIsModalOpen(false);
                setIsLinkModalOpen(false);
                setIsSettingsModalOpen(false);
              }
            }}
          >
            {/* 링크 모달 */}
            {isLinkModalOpen && <SharingLinkModal />}
            {/* 설정 모달 */}
            {isSettingsModalOpen && <VideoSettingModal videoRef={videoRef} />}
          </div>
        )}

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

          <Dialog>
            <DialogTrigger asChild>
              <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black">
                상담종료
              </AchromaticButton>
            </DialogTrigger>
            <DialogContent>
              <ReviewModal />
            </DialogContent>
          </Dialog>

          <AchromaticButton
            className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"
            onClick={toggleLink}
          >
            <div className="p-2">
              <Share2Icon color="black" size={20} />
            </div>
          </AchromaticButton>
          <AchromaticButton
            className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"
            onClick={toggleSettings}
          >
            <div className="p-2">
              <SettingsIcon color="black" size={20} />
            </div>
          </AchromaticButton>
        </div>
      </div>
    </main>
  );
}
