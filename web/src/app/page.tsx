"use client";
// import {
//   Card,
//   CardContent,
//   CardFooter,
// } from "./ui/component/molecule/card/card";
// import Form from "./ui/component/molecule/form/form-index";
// import Image from "next/image"; // next/image로 이미지 처리
// import Logo from "@/app/utils/public/Logo.png";
// import Teller from "./utils/public/Teller.svg";
// import Sun from "./utils/public/Sun.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { login } from "./business/login";
import { useRouter } from "next/navigation";
import MainPageContent from "./ui/component/organism/mainpage-content";
import TextInput from "./ui/component/atom/text-input/text-input";

export default function Home() {
  const router = useRouter();

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
        router.push("/customer/main");
      } else {
        setMismatch(true);
      }
    } else {
    }
  };

  // 버튼 클릭 핸들러
  const clickHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // 로그인 API 구현
    login();
  };

  return (
    <main className="flex h-screen">
      {/* 왼쪽 절반 */}
      <MainPageContent />

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
                <TextInput
                  id="username"
                  className="border rounded-xl p-3"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={username}
                  onValueChange={setUsername}
                />
              </div>
              {/* 비밀번호 input */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="font-bold">
                  비밀번호
                </label>
                <TextInput
                  id="password"
                  className="border rounded-xl p-3"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onValueChange={setPassword}
                />
                {mismatch && (
                  <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
                )}
              </div>
              <button
                onClick={clickHandler}
                className={`text-white w-1/2 py-4 rounded-lg ${
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
            <CardContent>
              <Form
                id="login-form"
                action={login}
                onSuccess={() => router.push("/customer")}
                failMessageControl="alert"
              >
                <Form.TextInput
                  label="아이디"
                  id="username"
                  placeholder="아이디를 입력하세요"
                ></Form.TextInput>
                <Form.PasswordInput
                  label="비밀번호"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                ></Form.PasswordInput>
              </Form>
            </CardContent>
            <CardFooter>
              <Form.SubmitButton label="로그인" position="center" />
            </CardFooter>
          </Card> */}
        </div>
      </div>
    </main>
  );
}
