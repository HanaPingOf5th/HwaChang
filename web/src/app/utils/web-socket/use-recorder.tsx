import { useCallback, useRef } from "react";
import {FFmpeg} from "@ffmpeg/ffmpeg"
import {fetchFile} from "@ffmpeg/util"
import { useConsultingRoomStore } from "@/app/stores/consulting-room.provider";

export const useRecorder = (remoteStream: MediaStream) => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const soundChunks = useRef<Blob[]>([]);
  const consultingRoom = useConsultingRoomStore((state)=> state.consultingRoomId)

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
    await ffmpeg.writeFile("sound.mp4", await fetchFile(blob))
    await ffmpeg.exec(['-i', 'sound.mp4', 'out.mp4']);
    const data = await ffmpeg.readFile('out.mp4');
    const updatedBlob = new Blob([data], { type: "audio/mp4" })

    const reader = new FileReader();
    reader.readAsDataURL(updatedBlob);

    reader.onloadend = async () => {
      const base64Data = reader.result?.toString().split(",")[1];
      const fileName = `consulting-data-${consultingRoom}.mp4`

      const response = await fetch("/api/ncloud-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64Data , fileName: fileName }),
      })

      console.log(response)
      console.log(`${process.env.NCLOUD_URL}/${fileName}`)
    }
    
    const audioUrl = URL.createObjectURL(updatedBlob);
    const link = document.createElement("a");
    link.download = `out.mp4`;
    link.href = audioUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(audioUrl);
  };

  return { startRecord, stopRecord, download, getAudioPermission };
};
