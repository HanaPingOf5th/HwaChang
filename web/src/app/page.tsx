"use client";
import { Card, CardContent, CardFooter } from "./ui/component/molecule/card/card";
import Form from "./ui/component/molecule/form/form-index";
import Image from "next/image"; // next/image로 이미지 처리
import Logo from "@/app/utils/public/Logo.png";

export default function Home() {
  return (
    <main className="flex h-screen">
      {/* 왼쪽 절반 */}
      <div className="w-1/2 h-full bg-[#1FAB89] flex flex-col justify-center items-center pt-8">
        {/* 로고 이미지 */}
        <Image src={Logo} alt="Logo" width={150} height={150} />

        {/* 안녕하세요 텍스트 */}
        <p className="text-white mt-16 font-bold">화상 창구, 화창(畫:窗)입니다.</p>
      </div>

      {/* 오른쪽 절반 */}
      <div className="flex w-1/2 h-full items-center justify-center bg-white px-4 dark:bg-gray-950">
        <div className="w-full max-w-md space-y-6">
          {/* <div className="flex flex-col justify-center items-center text-center text-4xl">화창(畫:窗)</div> */}
          <div className="flex flex-col justify-center items-center text-center text-4xl text-[#1FAB89]">회원가입</div>
          {/* 일반 로그인 */}
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Form.TextInput label="Email" id="email" placeholder="m@example.com" />
              </div>
              <div className="space-y-2">
                <Form.PasswordInput label="Password" id="password" placeholder="" />
              </div>
            </CardContent>
            <CardFooter>
              <Form.SubmitButton label="Sign in" position="center" className="w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
