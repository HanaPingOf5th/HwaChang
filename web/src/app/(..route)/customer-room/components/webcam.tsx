import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import TextInput from "@/app/ui/component/atom/text-input/text-input";
import { BsPersonVideo } from "react-icons/bs";
import {
  CheckIcon,
  CopyIcon,
  HeadphonesIcon,
  MicIcon,
  MicOffIcon,
  SettingsIcon,
  Share2Icon,
  VideoIcon,
  VideoOffIcon,
  Volume2Icon,
} from "lucide-react";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { Card, CardFooter } from "@/app/ui/component/molecule/card/card";
// import { NameTag } from "@/app/ui/component/atom/tag/name-tag";

const Webcam = () => {
  // 웹캠 관련
  const videoRef = useRef<HTMLVideoElement | undefined | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);

  // 모달 관련
  const modalBackground = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 링크 모달 관련
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // 소리 볼륨 관련
  const [inputVolume, setInputVolume] = useState<number>(0.5);
  const [outputVolume, setOutputVolume] = useState<number>(0.5);
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  // 설정 모달 관련
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [currentSetting, setCurrentSetting] = useState<string>("audio");

  useEffect(() => {
    // getUserMedia API를 통해 비디오와 오디오 스트림 접근
    const getMedia = async () => {
      const constraints = {
        video: { width: 800, height: 450, facingMode: "user" },
      };
      try {
        // 영상 가져오기
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        // 음성 가져오기
        audioContext.current = new window.AudioContext();
        gainNode.current = audioContext.current.createGain();
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    getMedia();

    // 컴포넌트가 언마운트될 때 스트림 정리
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  // 비디오 토글 함수
  // 비디오를 껐을 때 기본 화면 구성하면 좋을듯
  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  // 오디오 토글 함수
  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  // 링크 모달 토글 함수
  const toggleLink = () => {
    setIsModalOpen(!isModalOpen);
    setIsLinkModalOpen(!isLinkModalOpen);
  };

  // 링크 복사 함수
  // 토스트 같은 걸로 복사 되었다고 알리면 좋을듯
  const handleCopyButtonClick = () => {
    window.navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
  };

  // 설정 모달 토글 함수
  const toggleSettings = () => {
    setIsModalOpen(!isModalOpen);
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  // 입력 음량 조절 함수
  const handleInputVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setInputVolume(volume);
    if (gainNode.current) {
      gainNode.current.gain.value = volume;
    }
  };

  // 출력 음량 조절 함수
  const handleOutputVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setOutputVolume(volume);
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 모달 배경 (overlay) */}
      {isModalOpen && (
        <div
          ref={modalBackground}
          className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-10"
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setIsModalOpen(false);
              setIsLinkModalOpen(false);
              setIsSettingsModalOpen(false);
            }
          }}
        >
          {/* 링크 모달 */}
          {isLinkModalOpen && (
            <div className="bg-white rounded-xl w-1/2 h-1/3 flex flex-col justify-center items-center z-20 gap-5">
              <Share2Icon className="stroke-hwachang-darkgreen" size={60} />
              <p className="text-xl font-bold">초대 링크 복사하기</p>
              <div className="w-4/5 flex">
                <TextInput
                  value={window.location.href}
                  disabled
                  className="rounded-tr-none rounded-br-none text-hwachang-hwachanggray border-r-0"
                />
                <AchromaticButton
                  onClick={handleCopyButtonClick}
                  className="border-l-0 rounded-tl-none rounded-bl-none"
                >
                  {isCopied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
                </AchromaticButton>
              </div>
            </div>
          )}

          {/* 설정 모달 */}
          {isSettingsModalOpen && (
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
                        defaultValue={0.5}
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
                        defaultValue={0.5}
                        step={0.01}
                        value={outputVolume}
                        onChange={handleOutputVolumeChange}
                      />
                    </div>
                  </>
                )}
                {/*  */}
                {currentSetting === "video" && (
                  <>
                    <p className="text-2xl mt-5">영상 설정</p>
                    <div className="flex gap-4">
                      <BsPersonVideo size={22} />
                      <p>영상 배경 설정</p>
                    </div>
                    {/* 영상 베경 부분 */}
                    <div></div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <Card className="relative -z-10">
          <video
            className="rounded-xl aspect-[16/9] object-cover"
            ref={videoRef as LegacyRef<HTMLVideoElement> | undefined}
            autoPlay
            playsInline
            muted
            width="100%"
            height="auto"
          />
          <CardFooter className="absolute top-32 right-52 w-full h-full flex items-center justify-center text-white">
            {/* <NameTag name="이수민"/> */}
          </CardFooter>
      </Card>

      <div className="flex justify-center gap-4">
        {/* 마이크 제어 버튼 */}
        <AchromaticButton
          onClick={toggleAudio}
          className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"
        >
          <div className="p-2">
            {isAudioEnabled ? (
              <MicIcon color="black" size={20} />
            ) : (
              <MicOffIcon color="black" size={20} />
            )}
          </div>
        </AchromaticButton>
        {/* 카메라 제어 버튼 */}
        <AchromaticButton
          onClick={toggleVideo}
          className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"
        >
          <div className="p-2">
            {isVideoEnabled ? (
              <VideoIcon color="black" size={20} />
            ) : (
              <VideoOffIcon color="black" size={20} />
            )}
          </div>
        </AchromaticButton>
        {/* 대기중, 상담 종료 버튼 */}
        <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black">
          <div className="p-2">대기중</div>
        </AchromaticButton>
        {/* 링크 공유 모달 토글 버튼 */}
        <AchromaticButton
          className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"
          onClick={toggleLink}
        >
          <div className="p-2">
            <Share2Icon color="black" size={20} />
          </div>
        </AchromaticButton>
        {/* 설정 모달 토글 버튼 */}
        <AchromaticButton
          className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3"
          onClick={toggleSettings}
        >
          <div className="p-2">
            <SettingsIcon color="black" size={20} />
          </div>
        </AchromaticButton>
      </div>
    </div>
  );
};

export default Webcam;
