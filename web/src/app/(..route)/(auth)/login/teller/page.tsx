// "use client";

// import TextInput from "@/app/ui/component/atom/text-input/text-input";
// import MainPageContent from "@/app/ui/component/organism/mainpage-content";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function TellerLoginPage() {
//   const router = useRouter();

//   const [tellerNumber, settellerNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [mismatch, setMismatch] = useState(false);
//   const [isEmpty, setIsEmpty] = useState(true);

//   useEffect(() => {
//     setIsEmpty(tellerNumber === "" || password === "");
//   }, [tellerNumber, password]);

//   // 로그인 함수
//   const login = async () => {
//     try {
//       const response = await fetch("/api/teller/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ tellerNumber, password }),
//         credentials: "include",
//       });
//       const data = await response.json();
//       const token = data.token;
//       const refreshToken = data.refreshToken;
//       console.log("token : ", token);
//       console.log("refreshToken : ", refreshToken);

//       if (token === undefined || refreshToken === undefined) {
//         setMismatch(true);
//       } else {
//         setMismatch(false);
//         sessionStorage.setItem("accessToken", token);
//         sessionStorage.setItem("refreshToken", refreshToken);
//         router.push("/teller/main");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // 버튼 클릭 핸들러
//   const clickHandler = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     // 로그인 API 구현
//     login();
//   };

//   return (
//     <main className="flex h-screen">
//       {/* 왼쪽 화면 */}
//       <MainPageContent />

//       {/* 오른쪽 절반 */}
//       <div className="flex w-1/2 h-full items-center justify-center bg-white px-4 dark:bg-gray-950">
//         <div className="w-full max-w-md space-y-6">
//           <p className="flex flex-col justify-center items-center text-center text-3xl text-[#1FAB89]">
//             행원 로그인
//           </p>
//           {/* 로그인 Form 영역 */}
//           <div className="w-full space-y-10">
//             <form action="submit" className="flex flex-col gap-4 items-center">
//               {/* 아이디 input */}
//               <div className="flex flex-col gap-2 w-full">
//                 <label htmlFor="tellerNumber" className="font-bold">
//                   사원번호
//                 </label>
//                 <TextInput
//                   id="tellerNumber"
//                   className="border rounded-xl p-3"
//                   type="text"
//                   placeholder="사원번호를 입력하세요"
//                   value={tellerNumber}
//                   onValueChange={settellerNumber}
//                 />
//               </div>
//               {/* 비밀번호 input */}
//               <div className="flex flex-col gap-2 w-full">
//                 <label htmlFor="password" className="font-bold">
//                   비밀번호
//                 </label>
//                 <TextInput
//                   id="password"
//                   className="border rounded-xl p-3"
//                   type="password"
//                   placeholder="비밀번호를 입력하세요"
//                   value={password}
//                   onValueChange={setPassword}
//                 />
//                 {mismatch && <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>}
//               </div>
//               <button
//                 onClick={clickHandler}
//                 className={`text-white w-1/2 py-4 rounded-lg ${
//                   isEmpty ? "bg-[#D9D9D9] cursor-auto" : "bg-[#1FAB89] hover:brightness-90"
//                 }`}
//                 disabled={isEmpty ? true : false}
//               >
//                 로그인
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";
import { authenticateTeller } from "@/app/business/auth/teller/teller-auth.service";
import Form from "@/app/ui/component/molecule/form/form-index";
import MainPageContent from "@/app/ui/component/organism/mainpage-content";

export default function Home() {

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
            <Form action={authenticateTeller} id={"log-in"} failMessageControl={"alert"} >
                {/* className="flex flex-col gap-4 items-center"> */}
              {/* 아이디 input */}
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="tellerNumber" className="font-bold">
                사원번호
                </label>
                <Form.TextInput
                  id="tellerNumber"
                  className="border rounded-xl p-3"
                  placeholder="사원번호를 입력하세요"
                />
              </div>
              {/* 비밀번호 input */}
              <div className="flex flex-col pt-3 gap-2 w-full">
                <label htmlFor="password" className="font-bold">
                  비밀번호
                </label>
                <Form.PasswordInput
                  id="password"
                  className="border rounded-xl p-3"
                  placeholder="비밀번호를 입력하세요"
                  label=""
                />
              </div>
              <div className="pt-5">
              <Form.SubmitButton
                className={`text-white w-1/2 py-4 rounded-lg`}
                position="center"
                label="로그인"
              />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}