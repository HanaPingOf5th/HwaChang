"use client";

import TextInput from "@/app/ui/component/atom/text-input";
import Form from "@/app/ui/component/molecule/form/form-index";
import MainPageContent from "@/app/ui/component/organism/mainpage-content";
import Link from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mismatch, setMismatch] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(
      name === "" || phoneNumber === "" || username === "" || password === ""
    );
  }, [name, phoneNumber, username, password]);

  const signup = () => {
    if (username && password) {
      if (username === "username" && password === "password") {
        setUsername("");
        setPassword("");
        router.push("/customer");
      } else {
        setMismatch(true);
      }
    } else {
    }
  };

  // 버튼 클릭 핸들러
  const clickHandler = (e) => {
    e.preventDefault();
    // 회원가입 API 구현
    signup();
  };

  console.log("name", name);
  console.log("phoneNumber", phoneNumber);
  console.log("username", username);
  console.log("password", password);
  return (
    <main className="flex h-screen">
      <MainPageContent />
      <div className="flex w-1/2 h-full items-center justify-center bg-white px-4 dark:bg-gray-950">
        <div className="w-full max-w-md space-y-6">
          <p className="flex flex-col justify-center items-center text-center text-3xl text-[#1FAB89]">
            회원가입
          </p>
          {/* 회원가입 Form 영역 */}
          <div className="w-full space-y-10">
            <form action="submit" className="flex flex-col gap-4 items-center">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name" className="font-bold">
                  이름
                </label>
                <TextInput
                  type="text"
                  id="name"
                  className="border rounded-xl p-3"
                  value={name}
                  onValueChange={setName}
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="phone-number" className="font-bold">
                  전화번호
                </label>
                <TextInput
                  type="text"
                  id="phone-number"
                  className="border rounded-xl p-3"
                  value={phoneNumber}
                  onValueChange={setPhoneNumber}
                  placeholder="전화번호를 입력하세요"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="username" className="font-bold">
                  아이디
                </label>
                <TextInput
                  type="text"
                  id="username"
                  className="border rounded-xl p-3"
                  value={username}
                  onValueChange={setUsername}
                  placeholder="아이디를 입력하세요"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="font-bold">
                  비밀번호
                </label>
                <TextInput
                  type="password"
                  id="password"
                  className="border rounded-xl p-3"
                  value={password}
                  onValueChange={setPassword}
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              <button
                onClick={clickHandler}
                className={`text-white w-1/2 py-4 rounded-lg mt-10 ${
                  isEmpty
                    ? "bg-[#D9D9D9] cursor-auto"
                    : "bg-[#1FAB89] hover:brightness-90"
                }`}
              >
                회원가입
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
// type?: 'text' | 'password' | 'number';
// defaultValue?: string | number;
// value?: string | number;
// icon?: React.ElementType;
// error?: boolean;
// errorMessages?: string[];
// disabled?: boolean;
// onValueChange?: (value: string) => void;
