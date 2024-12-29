"use client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { LegacyRef, useEffect, useRef, useState } from "react";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  PowerOff
} from "lucide-react";
import { useSocket } from "@/app/utils/web-socket/useSocket";
import { Video, VideoView } from "@/app/(..route)/customer-room/components/video-view";
import { createMockMyProfile, mockProfile } from "@/app/(..route)/customer-room/mock/mock-profiles";
import { SharingLinkDialog } from "@/app/ui/consulting-room/modal/share-link-dialog";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";
import { useRouter } from "next/navigation";

export default function Home() {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const consultingRoomId = useConsultingRoomStore((state)=>state.consultingRoomId);
  const myKey = `${consultingRoomId}teller`

  const router = useRouter();


  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  
  const { client, video, startStream, startScreenStream, pcListMap } = useSocket({id: consultingRoomId, myKey:myKey});
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    if (!client || !consultingRoomId) return;
    
    console.log("Activating STOMP client...");
    client.activate();
  
    return () => {
      console.log("Deactivating STOMP client...");
      client.deactivate();
    };
  }, [client, consultingRoomId]);

  // string reset
  useEffect(()=>{
    setTimeout(()=>{
      console.log(consultingRoomId)
    },1000)
  }, [consultingRoomId])
  

  const handleStartStream = async () => {
    console.log(client.active)
    console.log(client.connected)
    if(client.connected){
      await startStream();
    }
  };

  const handleStartScreenStream = async () =>{
    if(client.connected){
      await startScreenStream();
    }
  }

  return (
    <main>
      <div>
        <div className="relative w-full h-1/6 p-6 bg-slate-100">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-0%)`}}>
            <div className="w-1/3 flex-shrink-0">
              <VideoView
                video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>} isTop={true} />}
                onCam={isVideoEnabled}
                isTop={true}
                profile={createMockMyProfile(true)}
              />
            </div>
          </div>
        </div>
        <div className="pt-4 px-6">
          <VideoView video={video[0]} onCam={true} profile={mockProfile}/>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex justify-center gap-4">
          <AchromaticButton
              onClick={async()=>{await handleStartScreenStream()}}
              className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black"
            >
            화면공유
          </AchromaticButton>
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
          <AchromaticButton 
            className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black" type="button" 
            onClick={async ()=>{ await handleStartStream();}}>
            상담시작
          </AchromaticButton>
          <SharingLinkDialog/>
          <AchromaticButton 
            className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black" type="button" 
            onClick={()=>{router.push('/teller/main');}}>
            <PowerOff/>
          </AchromaticButton>
        </div>
      </div>
    </main>
  );
}
