'use client'
import { CheckIcon, CopyIcon, Share2Icon } from "lucide-react";
import TextInput from "../../component/atom/text-input/text-input";
import AchromaticButton from "../../component/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/component/molecule/dialog/dialog";
import { useState } from "react";

export function SharingLinkDialog(){
    return(
        <Dialog>
        <DialogTrigger asChild>
          <AchromaticButton className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black">
            <div className="p-2">
              <Share2Icon color="black" size={20} />
            </div>
          </AchromaticButton>
        </DialogTrigger>
        <DialogContent>
          <SharingLink />
        </DialogContent>
        </Dialog>
    )
}

function SharingLink(){
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
  const handleCopyButtonClick = () => {
    window.navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
  };
  return(
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
  )
}