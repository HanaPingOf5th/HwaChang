"use client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/component/molecule/dialog/dialog";
import { LegacyRef, useEffect, useRef, useState } from "react";
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
import { ReviewModal } from "@/app/ui/consulting-room/modal/review-modal";
import { Video, VideoView } from "@/app/(..route)/customer-room/components/video-view";
import { createMockMyProfile } from "@/app/(..route)/customer-room/mock/mock-profiles";


export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);

  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const modalBackground = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

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

  return (
    <main>
      <div className="grid grid-row-1 gap-1 px-10 py-6">
        <p className={`mb-6 text-4xl text-hwachang-green1`}>
          <strong>상담준비 대기실</strong>
        </p>
        <div className="flex justify-between space-x-2">
          <p className={`mb-6 text-2xl text-hwachang-green1 font-semibold`}>
            상담 고객을 기다리는 중입니다...
          </p>
        </div>

        <VideoView
          video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>} />}
          onCam={isVideoEnabled}
          profile={createMockMyProfile(false)}
        />
      </div>
        

      <div className="flex justify-center space-x-4 mt-4">
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
