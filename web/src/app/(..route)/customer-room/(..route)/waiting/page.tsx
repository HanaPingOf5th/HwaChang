"use client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/component/molecule/dialog/dialog";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { MatchingAlarm } from "@/app/ui/consulting-room/modal/matching-alarm";
import { WaitingModal } from "@/app/ui/consulting-room/modal/waiting";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { Video, VideoView } from "../../components/video-view";
import { createMockMyProfile } from "../../mock/mock-profiles";
import { ReviewDialog } from "@/app/ui/consulting-room/modal/review-dialog";
import { SharingLinkDialog } from "@/app/ui/consulting-room/modal/share-link-dialog";
import { VideoSettingDialog } from "@/app/ui/consulting-room/modal/video-setting";
import { useSearchParams } from "next/navigation";
import { addCustomerToQueue } from "@/app/business/waiting-room/waiting-queue.service";

export default function Home() {
  const params = useSearchParams();
  const ctg = params.get("categoryId");
  const type = params.get("type");
  const [notifications, setNotifications] = useState<string[]>([]);

  // TODO: 대기열에 입장하는 API 연동
  useEffect(() => {
    // addCustomerToQueue(type, ctg).then((response) => {
    //   console.log(response); 
    // })
    const headers = new Headers([['access-control-allow-origin', "*"]]);


    // const EventSourcePolyfill = (window as any).EventSourcePolyfill || EventSource;
    // const eventSource = new EventSourcePolyfill('http://localhost:8080/queues/0',
    //   {
    //     withCredentials: true,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*"
    //     }
    //   }
    // );
    const eventSource = new EventSource("http://localhost:8080/queues/0", {
      withCredentials: true,
    });

    eventSource.addEventListener("message", (event) => {
      console.log("이벤트 왔어요")
      console.log(event);
    })

    eventSource.onopen = () => {
      console.log("서버에 연결되었습니다.")
    }

    // 서버에서 메시지 수신
    eventSource.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Message received:", message);

        // 상태 업데이트
        setNotifications((prev) => [...prev, message]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };
    // 에러 처리
    eventSource.onerror = (error) => {
      console.log("연결에 실패하였습니다.");
      console.error(error);
      eventSource.close(); // 연결 끊기
    };

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      eventSource.close();
    };

  }, [])

  // TODO: 레디스에서 내 "userId+consulting"이라는 키로 consultingRoom 객체를 가져오는 API 연동
  const [isWaitingDialogMounted, setIsWaitingDialogMounted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);

  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

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
    setIsWaitingDialogMounted(true);
  }, []);

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
        <ul>
          <li>결과</li>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
        <div className="flex justify-between space-x-2">
          <p className={`mb-6 text-2xl text-hwachang-green1 font-semibold`}>
            상담사를 기다리는 중입니다...
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <AchromaticButton className="bg-hwachang-brightgreen hover:bg-hwachang-lightgreen text-black">
                대기현황 보기
              </AchromaticButton>
            </DialogTrigger>
            {isWaitingDialogMounted && (
              <DialogContent>
                <WaitingModal />
              </DialogContent>
            )}
          </Dialog>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <AchromaticButton className="bg-hwachang-brightgreen hover:bg-hwachang-lightgreen text-black">
              (삭제 예정) 매칭 알림
            </AchromaticButton>
          </DialogTrigger>
          <DialogContent>
            <MatchingAlarm />
          </DialogContent>
        </Dialog>
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
          <ReviewDialog />
          <SharingLinkDialog />
          <VideoSettingDialog videoRef={videoRef} />
        </div>
      </div>
    </main>
  );
}
