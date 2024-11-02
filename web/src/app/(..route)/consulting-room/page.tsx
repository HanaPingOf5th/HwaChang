"use client";
import AchromaticButton from "@/app/ui/component/atom/button/achromatic-button";
import { GestureXEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card, CardFooter } from "@/app/ui/component/molecule/card/card";
import { useSearchParams } from "next/navigation";
import { HiInformationCircle } from "react-icons/hi";
import {
  IoRefresh,
} from "react-icons/io5";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/component/molecule/dialog/dialog";
import { LegacyRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Xemoji from "@/app/utils/public/Xemoji.svg";
import { MainView } from "./components/main-view";
import { ApplicationForm } from "./components/application-form";
import { MatchingAlarm } from "@/app/ui/consulting-room/matching-alarm";
import { CheckIcon, CopyIcon, MicIcon, MicOffIcon, SettingsIcon, Share2Icon, VideoIcon, VideoOffIcon } from "lucide-react";
// import {HeadphonesIcon, Volume2Icon } from "lucide-react";
import TextInput from "@/app/ui/component/atom/text-input/text-input";
// import { BsPersonVideo } from "react-icons/bs";
import { Video } from "./components/webcam";

export default function Home() {
  const params = useSearchParams();
  const [key, setKey] = useState<string | null>("true");
  const [isDialogMounted, setIsDialogMounted] = useState(false);

  // 하단 네브 바
  const videoRef = useRef<HTMLVideoElement | undefined | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);

  // const [inputVolume, setInputVolume] = useState<number>(0.5);
  // const [outputVolume, setOutputVolume] = useState<number>(0.5);
  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const modalBackground = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  // const [currentSetting, setCurrentSetting] = useState<string>("audio");

  // Form 관련
  const [isForm, setIsForm] = useState<boolean>(false);
  
  useEffect(()=>{
    const getMedia = async () => {
      try{
        const mediaStream = await navigator.mediaDevices.getUserMedia(
          {video: {width: 800, height: 450, facingMode: "user"}}
        )
        setVideoStream(mediaStream);
        if (videoRef.current){
          videoRef.current.srcObject = mediaStream;
        }
        audioContext.current = new window.AudioContext();
        gainNode.current = audioContext.current.createGain();
      } catch (error){
        throw new Error(error as string);
      }
    };

    getMedia();

    return () => {
      if(videoStream){
        videoStream.getTracks().forEach((track)=>track.stop());
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    }
  }, [])

  const toggleVideo = ()=>{
    if(videoStream){
      videoStream.getVideoTracks().forEach((track)=>(track.enabled = !track.enabled));
      setIsVideoEnabled(!isVideoEnabled);
    }
  }

  const toggleAudio = () => {
    if (videoStream) {
      videoStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleLink = () => {
    setIsModalOpen(!isModalOpen);
    setIsLinkModalOpen(!isLinkModalOpen);
  };

  const handleCopyButtonClick = () => {
    window.navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
  };

  const toggleSettings = () => {
    setIsModalOpen(!isModalOpen);
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  // const handleInputVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const volume = parseFloat(e.target.value);
  //   setInputVolume(volume);
  //   if (gainNode.current) {
  //     gainNode.current.gain.value = volume;
  //   }
  // };

  // const handleOutputVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const volume = parseFloat(e.target.value);
  //   setOutputVolume(volume);
  //   if (videoRef.current) {
  //     videoRef.current.volume = volume;
  //   }
  // };

  useEffect(() => {
    setKey(params.get("isWait") as string);
    setIsDialogMounted(true);
  }, [params]);

  return (
    <main>
      {key == "true" ? (
        <div className="grid grid-row-1 gap-1">
          <p className={`mb-6 text-4xl text-hwachang-green1`}>
            <strong>상담 대기실</strong>
          </p>
          <div className="flex justify-between space-x-2">
            <p className={`mb-6 text-2xl text-hwachang-green1 font-semibold`}>
              상담사를 기다리는 중입니다...
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <AchromaticButton className="bg-hwachang-brightgreen hover:bg-hwachang-lightgreen text-black">
                  대기현황 보기
                </AchromaticButton>
              </DialogTrigger>
              {isDialogMounted && (
                <DialogContent>
                  <div className="flex flex-col items-center">
                    <div className="w-full flex justify-end">
                      <Image src={Xemoji} alt="xemoji" width={20} height={20} />
                    </div>
                    <div className="flex justify-center p-10">
                      <GestureXEmoji width={200} heignt={200} />
                    </div>
                    <p className="text-center text-lg font-semibold">현재 접속량이 많아</p>
                    <p className="text-center text-lg font-semibold text-green-600">
                      상담 대기 중입니다.
                    </p>
                    <p className="text-center text-sm text-gray-500 pt-3">조금만 기다려 주세요.</p>
                    <div className="w-full mt-6">
                      <div className="flex items-center justify-center space-x-2">
                        <p className="text-lg font-medium">대기 인원</p>
                        <IoRefresh className="mt-1" width={16} height={16} color="gray" />
                        <p className="text-lg font-semibold">154,721명</p>
                      </div>
                      <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                        <HiInformationCircle className="mr-1" width={16} height={16} color="gray" />
                        <p className="pt-5">
                          화상 상담 전 채팅을 통해 상담할 내용을 적어주시면
                          <br /> 빠른 상담이 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <AchromaticButton className="bg-hwachang-brightgreen hover:bg-hwachang-lightgreen text-black">
                (삭제 예정) 매칭 알림
              </AchromaticButton>
            </DialogTrigger>
            <DialogContent>
              <MatchingAlarm />
            </DialogContent>
          </Dialog>
          <Card className="relative -z-10">
            <Video ref={videoRef as LegacyRef<HTMLVideoElement> | undefined}/>
            <CardFooter className="absolute top-32 right-52 w-full h-full flex items-center justify-center text-white">
              {/* <NameTag name="이수민"/> */}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div>
          <Card className="grid gap-6 grid-cols-3 text-center px-3 py-3 h-52">
            <MainView isTop={true} />
            <MainView isTop={true} />
            <MainView isTop={true} />
          </Card>
          <AchromaticButton
            onClick={() => {
              setIsForm(true);
            }}
          >
            mock form
          </AchromaticButton>
          <AchromaticButton
            onClick={() => {
              setIsForm(false);
            }}
          >
            mock view
          </AchromaticButton>
          <div className="pt-4">
            {isForm
              ?  
              <ApplicationForm />
              :
              <Card className="relative -z-10">
                <Video ref={videoRef as LegacyRef<HTMLVideoElement> | undefined}/>
                <CardFooter className="absolute top-32 right-52 w-full h-full flex items-center justify-center text-white">
                  {/* <NameTag name="이수민"/> */}
                </CardFooter>
              </Card>}
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-4 mt-4">
        {/* 모달 영역 */}
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
            {isSettingsModalOpen &&
              <></>
            //   (
            //   <div className="bg-white rounded-xl w-3/4 h-5/6 flex">
            //     {/* 설정 메뉴 */}
            //     <div className="w-[20%] border-r pl-4 py-4">
            //       <ul className="mt-5 space-y-4">
            //         <li
            //           onClick={() => setCurrentSetting("audio")}
            //           className={`rounded-l-lg pl-2 py-2 flex cursor-pointer gap-4 ${currentSetting === "audio" ? "bg-hwachang-gray2" : null}`}
            //         >
            //           <HeadphonesIcon />
            //           <span>오디오</span>
            //         </li>
            //         <li
            //           onClick={() => setCurrentSetting("video")}
            //           className={`rounded-l-lg pl-2 py-2 flex cursor-pointer gap-4 ${currentSetting === "video" ? "bg-hwachang-gray2" : null}`}
            //         >
            //           <VideoIcon />
            //           <span>비디오</span>
            //         </li>
            //       </ul>
            //     </div>
            //     {/* 설정 내용 */}
            //     <div className="w-[70%] flex flex-col gap-10 p-4">
            //       {/* 소리 설정 */}
            //       {currentSetting === "audio" && (
            //         <>
            //           <p className="text-2xl mt-5">소리 설정</p>
            //           {/* 입력 음량 */}
            //           <div className="flex flex-col gap-4">
            //             <label htmlFor="input-volume" className="flex gap-4">
            //               <Volume2Icon size={22} />
            //               <span>입력 음량 : {Math.round(inputVolume * 100)}</span>
            //             </label>
            //             <input
            //               className="w-full h-2 bg-gray-300 appearance-none rounded-lg cursor-pointer"
            //               style={{
            //                 background: `linear-gradient(to right, #62D2A2 0%, #62D2A2 ${inputVolume * 100}%, #e5e7eb ${inputVolume * 100}%, #e5e7eb 100%)`,
            //               }}
            //               id="input-volume"
            //               type="range"
            //               min={0}
            //               max={1}
            //               defaultValue={0.5}
            //               step={0.01}
            //               value={inputVolume}
            //               onChange={handleInputVolumeChange}
            //             />
            //           </div>
            //           {/* 출력 음량 */}
            //           <div className="flex flex-col gap-4">
            //             <label htmlFor="output-volume" className="flex gap-4">
            //               <MicIcon size={22} />
            //               <span>출력 음량 : {Math.round(outputVolume * 100)}</span>
            //             </label>
            //             <input
            //               className="w-full h-2 bg-gray-300 appearance-none rounded-lg cursor-pointer"
            //               style={{
            //                 background: `linear-gradient(to right, #62D2A2 0%, #62D2A2 ${outputVolume * 100}%, #e5e7eb ${outputVolume * 100}%, #e5e7eb 100%)`,
            //               }}
            //               id="output-volume"
            //               type="range"
            //               min={0}
            //               max={1}
            //               defaultValue={0.5}
            //               step={0.01}
            //               value={outputVolume}
            //               onChange={handleOutputVolumeChange}
            //             />
            //           </div>
            //         </>
            //       )}
            //       {/*  */}
            //       {currentSetting === "video" && (
            //         <>
            //           <p className="text-2xl mt-5">영상 설정</p>
            //           <div className="flex gap-4">
            //             <BsPersonVideo size={22} />
            //             <p>영상 배경 설정</p>
            //           </div>
            //           {/* 영상 베경 부분 */}
            //           <div></div>
            //         </>
            //       )}
            //     </div>
            //   </div>
            // )
          }
          </div>
        )}

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
    </main>
  );
}
