import { useEffect, useState } from "react";
import AchromaticButton from "../../component/atom/button/achromatic-button";
import { Card, CardContent, CardFooter, CardHeader } from "../../component/molecule/card/card";
import Form from "../../component/molecule/form/form-index";
import { FormSubmitButton } from "../../component/molecule/form/form-submit-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/component/molecule/dialog/dialog";
import { sendReview } from "@/app/business/consulting-room/review.service";

export function ReviewDialog({
  stopAndUploadRecording,
}: {
  stopAndUploadRecording: () => Promise<void>;
}) {
  const handleEndConsulting = async () => {
    try {
      await stopAndUploadRecording();
      console.log("녹음 중지 및 파일 업로드 완료");
    } catch (error) {
      console.error("녹음 중지 또는 업로드 중 오류 발생:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton
          onClick={handleEndConsulting}
          className="rounded-full bg-hwachang-gray2 hover:bg-hwachang-gray3 text-black"
        >
          상담종료
        </AchromaticButton>
      </DialogTrigger>
      <DialogContent>
        <Review />
      </DialogContent>
    </Dialog>
  );
}

function Review() {
  const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // ToDo: store에서 전역 데이터를 가져와서 consulting-room과 userId 가져오기
  useEffect(() => {
    if (isSubmitted) {
      window.location.href = "/customer-room/consulting";
    }
  }, [isSubmitted]);

  const handleScoreClick = (num: number) => {
    setCurrentScore(num);
    const hiddenInput = document.getElementById("nps-score") as HTMLInputElement;
    if (hiddenInput) {
      hiddenInput.value = num.toString();
    }
  };

  const scores: JSX.Element[] = numbers.map((num) => (
    <div key={num}>
      <AchromaticButton
        name="nps"
        value={num}
        id={`${num}`}
        className={`w-10 h-10 text-xl font-bold ${currentScore === num ? "bg-hwachang-darkgreen" : "bg-hwachang-green"}`}
        onClick={() => handleScoreClick(num)}
        type="button"
      >
        {num}
      </AchromaticButton>
    </div>
  ));

  return (
    <>
      <Card className="justify-items-center w-full h-full rounded-none border-white shadow-none">
        <CardHeader>
          <p className="text-center font-bold text-xl">
            이 서비스를 친구, 동료 등 주변인에게 추천하고 싶으신가요?
          </p>
          <p className="text-center font-semibold text-l">추천 정도를 1~10점으로 선택해주세요.</p>
        </CardHeader>

        <Form
          id="review"
          action={sendReview}
          onSuccess={() => setIsSubmitted(false)}
          failMessageControl="alert"
        >
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">{scores}</div>
            <input type="hidden" name="nps" id="nps-score" value={currentScore} />
            <input
              type="hidden"
              name="consulting-room"
              id="consulting-room"
              value={"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"}
            />
            <input
              type="hidden"
              name="user-id"
              id="user-id"
              value={"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"}
            />
            <input
              type="hidden"
              name="teller-id"
              id="teller-id"
              value={"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"}
            />
          </CardContent>
          <CardContent>
            <textarea
              name="review-content"
              className="w-full h-56 p-4 text-gray-600 bg-hwachang-brightgreen border-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
              placeholder="해당 점수를 준 사유를 자유롭게 입력해 주세요."
            />
          </CardContent>
          <CardFooter className="justify-center">
            <div className="grid grid-cols-2 gap-6 items-center">
              <AchromaticButton
                className="bg-hwachang-hanasilver text-md hover:bg-hwachang-hwachanggray lg:w-40 h-6 size-auto w-24 rounded-2xl"
                type="button"
              >
                건너뛰기
              </AchromaticButton>
              <FormSubmitButton
                className="bg-hwachang-darkgreen text-md lg:w-40 size-auto w-24 rounded-2xl"
                label="제출하기"
                position="center"
              />
            </div>
          </CardFooter>
        </Form>
      </Card>
    </>
  );
}
