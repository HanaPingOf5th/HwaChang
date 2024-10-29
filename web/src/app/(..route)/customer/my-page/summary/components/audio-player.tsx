import { useState } from "react";
import { IoMdPause } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { TbRewindBackward5, TbRewindForward5 } from "react-icons/tb";

export function AudioPlayer(){
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalDuration = 30 * 60;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.floor((clickX / rect.width) * totalDuration);
    setProgress(newProgress);
  };

  const handleTextClick = (index: number) => {
    console.log(`텍스트 ${index + 1} 클릭됨. 음성 재생.`);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };


  return (
    <div>
      <div className="mt-4">
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer" onClick={handleBarClick}>
          <div className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600`} style={{width: `${(progress / totalDuration) * 100}%`}}/>
        </div>
        <div className="flex justify-between text-sm mt-2 text-white">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <TbRewindBackward5 className="cursor-pointer text-3xl text-white hover:text-teal-300 transition-all transform hover:scale-110" title="Rewind 5s"/>
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
            className="cursor-pointer text-3xl text-white hover:text-teal-300 transition-all transform hover:scale-110"
            title="Forward 5s"
          />
        </div>
      </div>
    </div>
  )
}