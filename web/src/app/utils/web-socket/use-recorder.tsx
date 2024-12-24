import { useCallback, useRef } from "react";

export const useRecorder = (remoteStream: MediaStream) => {
  const soundRef = useRef<HTMLVideoElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const soundChunks = useRef<Blob[]>([]);
  
  const getAudioPermission = useCallback(async () => {
    try{
      
      // const audioStream = await navigator.mediaDevices.getUserMedia({audio: true});
      const stream = new MediaStream([...remoteStream.getAudioTracks()]);
      const recorder = new MediaRecorder(stream, {mimeType: "video/webm"});

      recorder.ondataavailable = (event) => {
        if(!event.data){return}
        if(event.data.size === 0){return}
        soundChunks.current.push(event.data);
      };

      mediaRecorder.current = recorder; 
    } catch(error){
        console.log(error);
    }
  }, []);

  function startRecord(){
    mediaRecorder.current?.start()
    console.log("녹음시작")
  }

  function stopRecord(){
    mediaRecorder.current?.stop()
    console.log("녹음종료")
  }

const download = ()=>{
  const blob = new Blob(soundChunks.current, {type: 'mimeType'});
  const audioUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `Audio.webm`;
    link.href = audioUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}

  return({audioRef: soundRef, audioChunks: soundChunks, getAudioPermission:getAudioPermission, startRecord: startRecord, stopRecord: stopRecord, download: download})
  
}
