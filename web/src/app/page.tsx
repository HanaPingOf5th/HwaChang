"use client";
import {
  Card,
  CardContent,
  CardFooter,
} from "./ui/component/molecule/card/card";
import Form from "./ui/component/molecule/form/form-index";
import Image from "next/image"; // next/image로 이미지 처리
import Logo from "@/app/utils/public/Logo.png";
import Teller from "./utils/public/Teller.svg";
import Sun from "./utils/public/Sun.svg";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mismatch, setMismatch] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(username === "" || password === "");
  }, [username, password]);

  // 로그인 함수
  const login = () => {
    if (username && password) {
      if (username === "username" && password === "password") {
        setUsername("");
        setPassword("");
        window.location.href = "/customer";
      } else {
        setMismatch(true);
      }
    } else {
    }
  };

  // 버튼 클릭 핸들러
  const clickHandler = (e) => {
    e.preventDefault();
    // 로그인 API 구현
    login();
  };

  return (
    <main className="flex h-screen">
      {/* 왼쪽 절반 */}
      <div className="relative p-20 flex flex-col justify-between text-white text-7xl w-1/2 h-full bg-[#1FAB89]">
        <Image
          className="absolute top-0 -right-32"
          src={Sun}
          alt="Sun"
          width={300}
          height={300}
        />
        <div className="flex flex-col items-start gap-5">
          <p>은행</p>
          <p>업무도</p>
          <p>
            <span className="text-8xl font-bold">화창</span>하게
          </p>
        </div>

        {/* 로고 이미지 */}
        <div className="text-2xl flex items-end justify-between">
          <Image src={Teller} alt="Teller" width={150} height={150} />
          <div className="flex items-end">
            <p>화상 창구,</p>
            <Image src={Logo} alt="Logo" width={150} height={150} />
          </div>
        </div>
      </div>

      {/* 오른쪽 절반 */}
      <div className="flex w-1/2 h-full items-center justify-center bg-white px-4 dark:bg-gray-950">
        <div className="w-full max-w-md space-y-6">
          <p className="flex flex-col justify-center items-center text-center text-3xl text-[#1FAB89]">
            로그인
          </p>
          {/* 로그인 Form 영역 */}
          <div className="w-full space-y-10">
            <form action="submit" className="flex flex-col gap-4 items-center">
              {/* 아이디 input */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="username" className="font-bold">
                  아이디
                </label>
                <input
                  id="username"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#62D2A2]"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {/* 비밀번호 input */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="font-bold">
                  비밀번호
                </label>
                <input
                  id="password"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#62D2A2]"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {mismatch && (
                  <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
                )}
              </div>
              <button
                onClick={clickHandler}
                className={`text-white w-1/2 py-3 rounded-lg ${
                  isEmpty
                    ? "bg-[#D9D9D9] cursor-auto"
                    : "bg-[#1FAB89] hover:brightness-90"
                }`}
              >
                로그인
              </button>
            </form>
            <div className="flex justify-center gap-5">
              <span
                style={{
                  color: "#6E6E6E",
                }}
              >
                혹시 화창이 처음이신가요?
              </span>
              <Link href={"/signup"}>
                <span
                  className="font-bold hover:underline"
                  style={{
                    color: "#1FAB89",
                  }}
                >
                  회원 가입
                </span>
              </Link>
            </div>
          </div>
          {/* 아토믹 디자인 */}
          {/* <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Form.TextInput
                  label="아이디"
                  id="username"
                  placeholder="아이디를 입력하세요"
                />
              </div>
              <div className="space-y-2">
                <Form.PasswordInput
                  label="비밀번호"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Form.SubmitButton
                label="로그인"
                position="center"
                className="w-1/2"
              />
            </CardFooter>
          </Card> */}
        </div>
      </div>
    </main>
  );
}
