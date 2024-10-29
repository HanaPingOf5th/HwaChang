import Slider from "@/app/ui/component/atom/slider/slider";
import { useState } from "react";
import { IoMdPause } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { TbRewindBackward5, TbRewindForward5 } from "react-icons/tb";

export function AudioPlayer(){
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([0]);
  const totalDuration = 30 * 60;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRewindButton = (isForward: boolean) => {
    let newProgress:number[] ;
    if(isForward){
      newProgress = ([progress[0]+5][0]>=totalDuration)?[totalDuration]:[progress[0]+5]
    }else{
      newProgress = ([progress[0]-5][0]<=0)?[0]:[progress[0]-5]
    }
    setProgress(newProgress);
  }

  return (
    <div>
      <div className="mt-4">
        <Slider min={0} max={totalDuration} onValueCommit={(value)=>{setProgress(value)}}/>
        <div className="flex justify-between text-sm mt-2 text-white">
          <span>{formatTime(progress[0])}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          {/* To-Do: rewind 버튼에 따라 슬라이드 current value 이동 */}
          <TbRewindBackward5
            onClick={()=>{handleRewindButton(false)}}
            className="cursor-pointer text-3xl text-white hover:text-teal-300 transition-all transform hover:scale-110" title="Rewind 5s"
          />
          {
            isPlaying ? (
            <IoMdPause
              onClick={handlePlayPause}
              className="cursor-pointer text-4xl text-white hover:text-teal-300 transition-all transform hover:scale-110"
              title="Pause"
            /> ) : (
            <IoPlay
              onClick={handlePlayPause}
              className="cursor-pointer text-4xl text-white hover:text-teal-300 transition-all transform hover:scale-110"
              title="Play"
            /> )
          }
          <TbRewindForward5
            onClick={()=>{handleRewindButton(true)}}
            className="cursor-pointer text-3xl text-white hover:text-teal-300 transition-all transform hover:scale-110"
            title="Forward 5s"
          />
        </div>
      </div>
    </div>
  )
}