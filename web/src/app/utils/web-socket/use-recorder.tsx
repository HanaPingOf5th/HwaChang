import { useCallback, useRef } from "react";

export const useRecorder = (remoteStream: MediaStream) => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const soundChunks = useRef<Blob[]>([]);

  const getAudioPermission = useCallback(async () => {
    try {
      const stream = new MediaStream(remoteStream.getAudioTracks());
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
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

  const download = () => {
    const blob = new Blob(soundChunks.current, { type: "audio/webm" });
    const audioUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `Audio.webm`;
    link.href = audioUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(audioUrl);
  };

  return { startRecord, stopRecord, download, getAudioPermission };
};
