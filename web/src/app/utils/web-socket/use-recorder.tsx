import { useCallback, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";

export const useRecorder = (remoteStream: MediaStream) => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const soundChunks = useRef<Blob[]>([]);
  const consultingRoom = useConsultingRoomStore((state) => state.consultingRoomId);

  const getAudioPermission = useCallback(async () => {
    try {
      const stream = new MediaStream(remoteStream.getAudioTracks());
      const recorder = new MediaRecorder(stream, { mimeType: "audio/mp4" });
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          soundChunks.current.push(event.data);
        }
      };
      mediaRecorder.current = recorder;
    } catch (error) {
      console.error("Audio permission error:", error);
    }
  }, [remoteStream]);

  const startRecord = () => {
    mediaRecorder.current?.start();
    console.log("녹음 시작");
  };

  const stopRecord = () => {
    mediaRecorder.current?.stop();
    console.log("녹음 종료");
  };

  const download = async () => {
    const blob = new Blob(soundChunks.current, { type: "audio/mp4" });
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();
    await ffmpeg.writeFile("sound.mp4", await fetchFile(blob));
    await ffmpeg.exec(["-i", "sound.mp4", "out.mp4"]);
    const data = await ffmpeg.readFile("out.mp4");
    const updatedBlob = new Blob([data], { type: "audio/mp4" });

    const reader = new FileReader();
    reader.readAsDataURL(updatedBlob);

    reader.onloadend = async () => {
      const base64Data = reader.result?.toString().split(",")[1];
      const fileName = `consulting-data-${consultingRoom}.mp4`;

      const response = await fetch("/api/ncloud-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64Data, fileName: fileName }),
      });

      console.log(response);
      console.log(`${process.env.NCLOUD_URL}/${fileName}`);
    };
  };

  const stopAndUpload = async () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.onstop = async () => {
        try {
          console.log("녹음 중지 완료, 업로드 시작");
          await download(); // 업로드 진행
          console.log("업로드 완료");
        } catch (error) {
          console.error("업로드 중 에러 발생:", error);
        }
      };

      stopRecord(); // 녹음 중지
    } else {
      console.error("MediaRecorder가 초기화되지 않았습니다.");
    }
  };

  return { startRecord, stopRecord, download, getAudioPermission, stopAndUpload };
};
