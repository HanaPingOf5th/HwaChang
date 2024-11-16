'use client'
import { HeadphonesIcon, MicIcon, VideoIcon, Volume2Icon } from "lucide-react";
import { MutableRefObject, useRef, useState } from "react";
import { BsPersonVideo } from "react-icons/bs";

export function VideoSettingModal({videoRef}:{videoRef: MutableRefObject<HTMLVideoElement>}){
  
  const [currentSetting, setCurrentSetting] = useState<string>("audio");
  const [inputVolume, setInputVolume] = useState<number>(0.5);
  const [outputVolume, setOutputVolume] = useState<number>(0.5);
  const gainNode = useRef<GainNode | null>(null);

  const handleInputVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setInputVolume(volume);
    if (gainNode.current) {
      gainNode.current.gain.value = volume;
    }
  };

  const handleOutputVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setOutputVolume(volume);
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  };

  return(
    <div className="bg-white rounded-xl w-3/4 h-5/6 flex">
      {/* 설정 메뉴 */}
      <div className="w-[20%] border-r pl-4 py-4">
        <ul className="mt-5 space-y-4">
          <li
            onClick={() => setCurrentSetting("audio")}
            className={`rounded-l-lg pl-2 py-2 flex cursor-pointer gap-4 ${currentSetting === "audio" ? "bg-hwachang-gray2" : null}`}
          >
          <HeadphonesIcon />
          <span>오디오</span>
          </li>
          <li
            onClick={() => setCurrentSetting("video")}
            className={`rounded-l-lg pl-2 py-2 flex cursor-pointer gap-4 ${currentSetting === "video" ? "bg-hwachang-gray2" : null}`}
          >
        <VideoIcon />
          <span>비디오</span>
          </li>
          </ul>
        </div>
        {/* 설정 내용 */}
        <div className="w-[70%] flex flex-col gap-10 p-4">
          {/* 소리 설정 */}
          {currentSetting === "audio" && (
          <>
            <p className="text-2xl mt-5">소리 설정</p>
            {/* 입력 음량 */}
            <div className="flex flex-col gap-4">
              <label htmlFor="input-volume" className="flex gap-4">
              <Volume2Icon size={22} />
              <span>입력 음량 : {Math.round(inputVolume * 100)}</span>
              </label>
              <input
                className="w-full h-2 bg-gray-300 appearance-none rounded-lg cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #62D2A2 0%, #62D2A2 ${inputVolume * 100}%, #e5e7eb ${inputVolume * 100}%, #e5e7eb 100%)`,
                }}
                id="input-volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={inputVolume}
                onChange={handleInputVolumeChange}
              />
            </div>
            {/* 출력 음량 */}
            <div className="flex flex-col gap-4">
              <label htmlFor="output-volume" className="flex gap-4">
                <MicIcon size={22} />
                <span>출력 음량 : {Math.round(outputVolume * 100)}</span>
              </label>
              <input
                className="w-full h-2 bg-gray-300 appearance-none rounded-lg cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #62D2A2 0%, #62D2A2 ${outputVolume * 100}%, #e5e7eb ${outputVolume * 100}%, #e5e7eb 100%)`,
                }}
                id="output-volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={outputVolume}
                onChange={handleOutputVolumeChange}
              />
            </div>
        </>
        )}
        {currentSetting === "video" && (
          <>
            <p className="text-2xl mt-5">영상 설정</p>
            <div className="flex gap-4">
              <BsPersonVideo size={22} />
              <p>영상 배경 설정</p>
            </div>
            {/* 영상 베경 부분 */}
          </>
        )}
      </div>
    </div>
  )
}