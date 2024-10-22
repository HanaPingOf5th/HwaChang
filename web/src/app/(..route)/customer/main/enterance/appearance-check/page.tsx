import AchromaticButton from "@/app/ui/component/atom/achromatic-button";
import { Card, CardContent, CardHeader } from "@/app/ui/component/molecule/card/card";

export default function Home() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
        외모 체크
      </h1>
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4 text-center">
      <div className={`grid gap-6 grid-cols-2 text-center`}>
      <Card>
        <CardHeader>
          엄마
        </CardHeader>
        <CardContent>엄마사진</CardContent>
        <CardContent> 조르기 </CardContent>
      </Card>
      <Card>
        <CardHeader>
          아빠
        </CardHeader>
        <CardContent>아빠 사진</CardContent>
        <CardContent> 조르기 </CardContent>
      </Card>
      <Card>
        <CardHeader>
          엄마
        </CardHeader>
        <CardContent>엄마 사진</CardContent>
        <CardContent> 조르기 </CardContent>
      </Card>
      <Card>
        <CardHeader>
          아빠
        </CardHeader>
        <CardContent>아빠 사진</CardContent>
        <CardContent> 조르기 </CardContent>
      </Card>   
      </div>
      <AchromaticButton>골랐어요</AchromaticButton>
      </div>
    </main>
  );
}
