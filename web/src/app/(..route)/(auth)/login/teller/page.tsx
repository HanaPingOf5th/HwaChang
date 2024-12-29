"use client";
import { authenticateTeller } from "@/app/business/auth/teller/teller-auth.service";
import Form from "@/app/ui/component/molecule/form/form-index";
import MainPageContent from "@/app/ui/component/organism/mainpage-content";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex h-screen">
      {/* 왼쪽 절반 */}
      <MainPageContent />

      {/* 오른쪽 절반 */}
      <div className="flex w-1/2 h-full items-center justify-center bg-white px-4 dark:bg-gray-950">
        <div className="w-full max-w-md space-y-6">
          <p className="flex flex-col justify-center items-center text-center text-3xl text-black">
            로그인
          </p>
          {/* 로그인 Form 영역 */}
          <div className="w-full space-y-10">
            <Form
              action={authenticateTeller}
              id={"log-in"}
              onSuccess={() => {
                router.push("/teller/main");
              }}
              failMessageControl={"alert"}
            >
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
              <div className="pt-11">
                <Form.SubmitButton
                  className={`text-white w-1/2 py-7 rounded-lg bg-hwachang-darkgreen hover:bg-hwachang-green1`}
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
