import { useState, useRef, useEffect } from "react";
import Slider from "@/app/ui/component/atom/slider/slider";
import { IoMdPause } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { TbRewindBackward5, TbRewindForward5 } from "react-icons/tb";

interface AudioPlayerProps {
  voiceUrl: string; // 오디오 URL 추가
}

export function AudioPlayer({ voiceUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setTotalDuration(audioRef.current?.duration || 0);
      };
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        audioRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [voiceUrl]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewindButton = (isForward: boolean) => {
    if (audioRef.current) {
      audioRef.current.currentTime = isForward
        ? Math.min(audioRef.current.currentTime + 5, totalDuration)
        : Math.max(audioRef.current.currentTime - 5, 0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleSliderChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={voiceUrl} onTimeUpdate={handleTimeUpdate} />
      <div className="mt-4">
        <Slider
          min={0}
          max={totalDuration}
          value={[progress]}
          onValueChange={(value) => handleSliderChange(value[0])}
          onValueCommit={(value) => handleSliderChange(value[0])}
        />
        <div className="flex justify-between text-sm mt-2 text-hwachang-hwachanggray">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <TbRewindBackward5
            onClick={() => handleRewindButton(false)}
            className="cursor-pointer text-3xl text-hwachang-hwachanggray transition-all transform hover:scale-110"
            title="Rewind 5s"
          />
          {isPlaying ? (
            <IoMdPause
              onClick={handlePlayPause}
              className="cursor-pointer text-4xl text-hwachang-hwachanggray transition-all transform hover:scale-110"
              title="Pause"
            />
          ) : (
            <IoPlay
              onClick={handlePlayPause}
              className="cursor-pointer text-4xl text-hwachang-hwachanggray transition-all transform hover:scale-110"
              title="Play"
            />
          )}
          <TbRewindForward5
            onClick={() => handleRewindButton(true)}
            className="cursor-pointer text-3xl text-hwachang-hwachanggray transition-all transform hover:scale-110"
            title="Forward 5s"
          />
        </div>
      </div>
    </div>
  );
}
