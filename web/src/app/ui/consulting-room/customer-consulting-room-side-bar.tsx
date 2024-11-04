'use client'

import { useState } from "react"
import AchromaticButton from "../component/atom/button/achromatic-button"
import { NameTag } from "../component/atom/tag/name-tag"
import { Card, CardContent, CardHeader } from "../component/molecule/card/card"
import { MyChat, OtherChat } from "./chat-box"
import Form from "../component/molecule/form/form-index"
import { FormState } from "../component/molecule/form/form-root"
import { FormTextInput } from "../component/molecule/form/form-textinput"
import { LuSendHorizonal } from "react-icons/lu";
import Chatting from "./chatting"
import Image from "next/image";
import Logo from "@/app/utils/public/Logo.png";

export default function ConsultingRoomSideBar() {
  return (
    <div className="bg-hwachang-darkgreen p-7 space-y-8">
      <Chatting />
      <div className="flex justify-end">
        <Image src={Logo} alt="Logo" width={80} height={60} />
      </div>
    </div>
  )
}