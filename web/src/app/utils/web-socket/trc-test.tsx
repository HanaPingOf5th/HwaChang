'use client'
import { LegacyRef, useEffect, useRef,} from "react";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { useSocket } from "./useSocket";
import { Video, VideoView } from "@/app/(..route)/customer-room/components/video-view";

export default function WebCamTest() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { client, video, startStream } = useSocket();

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 800, height: 450, facingMode: "user" },
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("미디어 스트림을 가져오지 못했습니다.", error);
      }
    };

    getMedia();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (client) {
      client.activate();
    } else{
      console.log("웹소켓 클라이언트 로딩에 실패했습니다.")
    }
  }, []);

  const handleStartStream = () => {
    if (client.connected) {
      startStream();
    } else {
      console.log("WebSocket 연결이 아직 완료되지 않았습니다.");
    }
  };

  return (
    <main>
      <div className="font-semibold">웹 소켓 연결 확인 ...</div>
      <AchromaticButton type="button" onClick={()=>{handleStartStream()}}>Stream Start</AchromaticButton>
      <VideoView
            video={<Video ref={videoRef as LegacyRef<HTMLVideoElement>}/>}
            onCam={true}
            profile={{
              picture: <div>이수민 행원의 사진이 들어갈 곳</div>,
              name: "이수민",
            }}
          />
      <div>
        <VideoView
          video={video[0]}
          onCam={true}
          profile={{
            picture: <div>다른 사람의 사진이 들어갈 곳</div>,
            name: "다른 사람",
          }}
        />
      </div>
    </main>
  );
}
