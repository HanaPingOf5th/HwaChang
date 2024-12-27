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

  const download = async (): Promise<string> => {
    const blob = new Blob(soundChunks.current, { type: "audio/mp4" });
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();
    await ffmpeg.writeFile("sound.mp4", await fetchFile(blob));
    await ffmpeg.exec(["-i", "sound.mp4", "out.mp4"]);
    const data = await ffmpeg.readFile("out.mp4");
    const updatedBlob = new Blob([data], { type: "audio/mp4" });

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(updatedBlob);

      reader.onloadend = async () => {
        try {
          const base64Data = reader.result?.toString().split(",")[1];
          const fileName = `consulting-data-${consultingRoom}.mp4`;

          const response = await fetch("/api/ncloud-upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file: base64Data, fileName: fileName }),
          });

          if (!response.ok) {
            throw new Error("파일 업로드 실패");
          }

          const voiceUrl = `https://kr.object.ncloudstorage.com/consulting-audiofile/${fileName}`;
          console.log(`업로드 완료: ${voiceUrl}`);
          resolve(voiceUrl);
        } catch (error) {
          console.error("업로드 중 에러 발생:", error);
          reject(error);
        }
      };
      reader.onerror = () => {
        console.error("파일 읽기 중 에러 발생");
        reject(new Error("파일 읽기 실패"));
      };
    });
  };

  const stopAndUpload = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (mediaRecorder.current) {
        mediaRecorder.current.onstop = async () => {
          try {
            console.log("녹음 중지 완료, 업로드 시작");
            const voiceUrl = await download(); // 업로드 후 URL 반환
            console.log("업로드 완료:", voiceUrl);
            resolve(voiceUrl); // voiceUrl 반환
          } catch (error) {
            console.error("업로드 중 에러 발생:", error);
            reject(error);
          }
        };

        stopRecord(); // 녹음 중지
      } else {
        reject(new Error("MediaRecorder가 초기화되지 않았습니다."));
      }
    });
  };

  return { startRecord, stopRecord, download, getAudioPermission, stopAndUpload };
};
