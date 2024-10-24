"use client";

import TextInput from "@/app/ui/component/atom/text-input";
import MainPageContent from "@/app/ui/component/organism/mainpage-content";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import check from "@/app/utils/public/Check.svg";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();

  // 이름 관련
  const [name, setName] = useState("");

  // 전화번호 관련
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberContent, setPhoneNumberContent] = useState("");

  // 아이디 관련
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isUsernameValidLength, setIsUsernameValidLength] = useState(false);
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);
  const [isDuplicateCheckDisabled, setIsDuplicateCheckDisabled] =
    useState(true);
  const [isDuplicateCheckCompleted, setIsDuplicateCheckCompleted] =
    useState(false);

  // 비밀번호 관련
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // 전체 Form
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(
      name === "" || phoneNumber === "" || username === "" || password === ""
    );
  }, [name, phoneNumber, username, password]);

  const signup = () => {
    if (username && phoneNumber && username && password) {
      router.push("/");
    }
  };

  // 버튼 클릭 핸들러
  const clickHandler = (e) => {
    e.preventDefault();
    // 회원가입 API 구현
    signup();
  };

  // 중복 확인 버튼 클릭
  const duplicateCheckHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value, username);
    if (username === "username") {
      setIsUsernameDuplicate(true);
    } else {
      setIsUsernameDuplicate(false);
    }
    setIsDuplicateCheckCompleted(true);
  };

  // 아이디는 영어 또는 숫자만 가능
  const checkUsername = (str: string) => {
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
  };

  // 아이디는 4글자 이상 12글자 이하
  const checkUsernameLength = (str: string) => {
    return str.length >= 4 && str.length <= 12;
  };

  // 비밀번호는 8글자 이상, 영문 대소문자, 숫자, 특수문자를 조합해야 함
  const checkPassword = (str: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      str
    );
  };

  // 아이디가 바뀌면 중복검사를 다시 해야함
  useEffect(() => {
    setIsDuplicateCheckCompleted(false);
  }, [username]);

  // 아이디 유효성 검사
  useEffect(() => {
    setIsUsernameValid(checkUsername(username));
    setIsUsernameValidLength(checkUsernameLength(username));
  }, [username]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    setIsPasswordValid(checkPassword(password));
  }, [password]);

  // 아이디 중복검사 버튼 비활성화
  useEffect(() => {
    setIsDuplicateCheckDisabled(!isUsernameValid || !isUsernameValidLength);
  }, [isUsernameValid, isUsernameValidLength]);

  // 전화번호 표시
  useEffect(() => {
    if (phoneNumber.length === 11) {
      setPhoneNumberContent(
        phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    } else if (phoneNumber.length === 13) {
      setPhoneNumberContent(
        phoneNumber
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    } else {
      setPhoneNumberContent(phoneNumber);
    }
  }, [phoneNumber]);

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
                  maxLength={20}
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
                  maxLength={13}
                  type="text"
                  id="phone-number"
                  className="border rounded-xl p-3"
                  value={phoneNumberContent}
                  onValueChange={(value) => {
                    const onlyNumbersAndHyphens = value.replace(/[^0-9-]/g, ""); // 숫자와 하이픈만 허용
                    if (onlyNumbersAndHyphens.length <= 13) {
                      setPhoneNumber(onlyNumbersAndHyphens);
                    }
                  }}
                  placeholder="전화번호를 입력하세요"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="username" className="font-bold">
                  아이디
                </label>
                <div className="flex w-full">
                  <TextInput
                    maxLength={12}
                    type="text"
                    id="username"
                    className="border rounded-xl rounded-tr-none rounded-br-none p-3"
                    value={username}
                    onValueChange={setUsername}
                    placeholder="아이디를 입력하세요"
                  />
                  <button
                    className={`w-1/3 flex justify-center items-center text-white border-[#8E8E8E] rounded-xl rounded-tl-none rounded-bl-none ${
                      isDuplicateCheckDisabled
                        ? `bg-[#D9D9D9] cursor-auto`
                        : `bg-[#1FAB89] hover:brightness-90`
                    }`}
                    onClick={duplicateCheckHandler}
                    disabled={isDuplicateCheckDisabled}
                  >
                    {!isUsernameDuplicate && isDuplicateCheckCompleted ? (
                      <Image
                        src={check}
                        alt="check"
                        width={40}
                        height={40}
                      ></Image>
                    ) : (
                      "중복검사"
                    )}
                  </button>
                </div>
                {!isUsernameDuplicate && isDuplicateCheckCompleted && (
                  <p className="text-green-500">사용 가능한 아이디입니다.</p>
                )}
                {isUsernameDuplicate && isDuplicateCheckCompleted && (
                  <p className="text-red-500">중복 아이디입니다.</p>
                )}
                {!isUsernameValid && username !== "" && (
                  <p className="text-red-500">
                    아이디는 영어 또는 숫자만 가능합니다.
                  </p>
                )}
                {isUsernameValid &&
                  !isUsernameValidLength &&
                  username !== "" && (
                    <p className="text-red-500">
                      아이디는 4글자 이상 12글자 이하여야 합니다.
                    </p>
                  )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="username" className="font-bold">
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
                {!isPasswordValid && password !== "" && (
                  <p className="text-red-500">
                    비밀번호는 8글자 이상으로, 영문 대소문자, 숫자, 특수문자를
                    조합해서 사용하세요.
                  </p>
                )}
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
