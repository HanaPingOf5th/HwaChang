import { useCallback, useRef } from "react";
import {FFmpeg} from "@ffmpeg/ffmpeg"
import {fetchFile} from "@ffmpeg/util"

export const useRecorder = (remoteStream: MediaStream) => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const soundChunks = useRef<Blob[]>([]);

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

    const audioUrl = URL.createObjectURL(new Blob([data], { type: "audio/mp4" }));
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
