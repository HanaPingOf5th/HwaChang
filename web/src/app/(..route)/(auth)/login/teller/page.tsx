"use client";

import TextInput from "@/app/ui/component/atom/text-input/text-input";
import MainPageContent from "@/app/ui/component/organism/mainpage-content";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TellerLoginPage() {
  const router = useRouter();

  const [employeeNumber, setemployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [mismatch, setMismatch] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(employeeNumber === "" || password === "");
  }, [employeeNumber, password]);

  // 로그인 함수
  const login = () => {
    if (employeeNumber && password) {
      if (employeeNumber === "hana_0001" && password === "password") {
        setemployeeNumber("");
        setPassword("");
        router.push("/teller/main");
      } else {
        setMismatch(true);
      }
    } else {
    }
  };

  // 버튼 클릭 핸들러
  const clickHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // 로그인 API 구현
    login();
  };

  return (
    <main className="flex h-screen">
      {/* 왼쪽 화면 */}
      <MainPageContent />

      {/* 오른쪽 절반 */}
      <div className="flex w-1/2 h-full items-center justify-center bg-white px-4 dark:bg-gray-950">
        <div className="w-full max-w-md space-y-6">
          <p className="flex flex-col justify-center items-center text-center text-3xl text-[#1FAB89]">
            행원 로그인
          </p>
          {/* 로그인 Form 영역 */}
          <div className="w-full space-y-10">
            <form action="submit" className="flex flex-col gap-4 items-center">
              {/* 아이디 input */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="employeeNumber" className="font-bold">
                  사원번호
                </label>
                <TextInput
                  id="employeeNumber"
                  className="border rounded-xl p-3"
                  type="text"
                  placeholder="사원번호를 입력하세요"
                  value={employeeNumber}
                  onValueChange={setemployeeNumber}
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
                {mismatch && <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>}
              </div>
              <button
                onClick={clickHandler}
                className={`text-white w-1/2 py-4 rounded-lg ${
                  isEmpty ? "bg-[#D9D9D9] cursor-auto" : "bg-[#1FAB89] hover:brightness-90"
                }`}
              >
                로그인
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
