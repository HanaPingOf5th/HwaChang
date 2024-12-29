"use client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { LegacyRef, useEffect, useRef, useState } from "react";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { createMockMyProfile } from "@/app/(..route)/customer-room/mock/mock-profiles";
import { Video, VideoView } from "@/app/(..route)/customer-room/components/video-view";
import { deleteCustomerFromQueueAndCreatingRoom, initialConsultingRoomInfoType } from "@/app/business/waiting-room/waiting-queue.service";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const { consultingRoomId, customerId, tellerId, customerName, updateCustomer, updateTeller, updateConsultingRoomId, updateCustomerName } = useConsultingRoomStore(
    (state) => state,
  );

  const tellerType = useConsultingRoomStore(state=>state.tellerType)


  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

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

  useEffect(()=>{
      if(tellerType === null) return;
      if( consultingRoomId === null){
        console.log(tellerType);
        
        deleteCustomerFromQueueAndCreatingRoom(tellerType).then((response)=>{
          console.log(response)
          const roomInfo = response.data as initialConsultingRoomInfoType;
          const consultingRoomId: string = roomInfo.consultingRoomId;
          const customerId: string = roomInfo.customerId;
          const tellerId: string = roomInfo.tellerId;
          const customerName: string = roomInfo.userName;

          updateConsultingRoomId(consultingRoomId)
          updateCustomerName(customerName)
          updateCustomer(customerId)
          updateTeller(tellerId)
        })
      }
  },[tellerType])

  useEffect(()=>{
    console.log('tellerType:', tellerType)
    console.log(consultingRoomId, customerId, tellerId, 'username: ',customerName )
  },[consultingRoomId, customerId, tellerId])

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
      <div className="grid grid-row-1 gap-1 px-10 py-6">
        <p className={`mb-6 text-4xl text-hwachang-green1`}>
          <strong>상담 대기실</strong>
        </p>
        <div className="flex justify-between space-x-2">
          <p className={`mb-6 text-2xl text-hwachang-green1 font-semibold`}>
            고객을 기다리는 중입니다...
          </p>
        </div>
        <VideoView
          video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>} />}
          onCam={isVideoEnabled}
          profile={createMockMyProfile(false)}
        />
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
          <AchromaticButton
            className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black"
            onClick={() => { router.push("/teller-room/consulting") }}
          >
            상담실 이동
          </AchromaticButton>
        </div>
      </div>
    </main>
  );
}