"use client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { useSearchParams } from "next/navigation";
import { LegacyRef, Suspense, useEffect, useRef, useState } from "react";

import { MicIcon, MicOffIcon, SettingsIcon, Share2Icon, VideoIcon, VideoOffIcon } from "lucide-react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Profile, Video, VideoView } from "../consulting-room/components/video-view";
import { VideoSettingModal } from "@/app/ui/consulting-room/modal/video-setting";
import { SharingLinkModal } from "@/app/ui/consulting-room/modal/sharing-link";

export default function Home() {
  const params = useSearchParams();
  const [key, setKey] = useState<string | null>("true");

  const videoRef = useRef<HTMLVideoElement | undefined | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isMikeEnabled, setIsMikeEnabled] = useState<boolean>(true);
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const modalBackground = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

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

  const mockProfile: Profile ={
    picture: <div>이수민 행원의 사진이 들어갈 곳</div>,
    name: "이수민",
  }

  const mockMyProfile: Profile ={
    picture: <div>계정 주인의 사진이 들어갈 곳</div>,
    name: "나나나",
  } 

  const mockOtherProfile: Profile ={
    picture: <div>상담 참여자들이 화면을 껐을 때 대체할 사진이 들어갈 자리</div>,
    name: "참여자",
  } 

  const videoViews = Array(5).fill(<VideoView isTop={true} video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>}/>} onCam={false} profile={mockOtherProfile}/>);
  
  useEffect(()=>{
    const getMedia = async () => {
      try{
        const mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia(
          {video: {width: 800, height: 450, facingMode: "user"}, audio: true}
        )
        setVideoStream(mediaStream);
        if (videoRef.current){
          videoRef.current.srcObject = mediaStream;
        }
        audioContext.current = new window.AudioContext();
        gainNode.current = audioContext.current.createGain();
      } catch (error){
        throw new Error(error as string);
      }
    };
    
    getMedia();

    return () => {
      if(videoStream){
        videoStream.getTracks().forEach((track)=>track.stop());
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    }
  }, [isVideoEnabled])

  useEffect(() => {
    setKey(params.get("isWait") as string);
  }, [params]);

  // To-Do: 내가 비디오를 끌 경우, 나의 비디오 상태를 상대방에게 보내는 api 추가: isCam: false
  const toggleVideo = () => {
    if(videoStream){
      videoStream.getVideoTracks().forEach((track)=>(track.enabled = !track.enabled));
      setIsVideoEnabled(!isVideoEnabled);
    }
  }

  // To-Do: 내가 오디오를 끌 경우, 나의 오디오 상태를 상대방에게 보내는 api 추가: isCam: false
  const toggleAudio = () => {
    if (videoStream) {
      videoStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsMikeEnabled(!isMikeEnabled);
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
      <Suspense fallback={<div>로딩 중...</div>}>
      {key == "true" ? (
        <div className="grid grid-row-1 gap-1 px-10 py-6">
          <p className={`mb-6 text-4xl text-hwachang-green1`}>
            <strong>상담 대기실</strong>
          </p>
          <div className="flex justify-between space-x-2">
            <p className={`mb-6 text-2xl text-hwachang-green1 font-semibold`}>
              상담사를 기다리는 중입니다...
            </p>
          </div>
          <VideoView
            video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>}/>}
            onCam={isVideoEnabled}
            profile={mockProfile}
          />
        </div>
      ) : (
        <div>
          <div className="relative w-full overflow-hidden h-1/6 p-6 bg-slate-100">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${slideIndex * 100 / 3}%)` }}
            >
              <div className="w-1/3 flex-shrink-0">
                <VideoView
                  video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>} isTop={true}/>}
                  onCam={isVideoEnabled}
                  isTop={true}
                  profile={mockMyProfile}
                />
              </div>
              {videoViews.map((videoView, index) => (
                <div key={index} className="w-1/3 flex-shrink-0">
                  {videoView}
                </div>
              ))}
            </div>
            {slideIndex > 0 && (
              <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 px-3">
                <SlArrowLeft/>
              </button>
            )}
            {slideIndex < videoViews.length - 3 && (
              <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3">
                <SlArrowRight/>
              </button>
            )}
          </div>
          
          <div className="pt-4 px-6">
            <VideoView
              video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>}/>}
              onCam={false}
              profile={mockProfile}
            />
          </div>
        </div>
      )}

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
            {isLinkModalOpen && (<SharingLinkModal/>)}

            {/* 설정 모달 */}
            {isSettingsModalOpen &&<VideoSettingModal videoRef={videoRef}/>}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <AchromaticButton
            onClick={toggleAudio}
            className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"
          >
            <div className="p-2">
              {isMikeEnabled ? (
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
          <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black">
            <div className="p-2">대기중</div>
          </AchromaticButton>
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
      </Suspense>
    </main>
  );
}
