import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";

export default function Home() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
        은행 고객 메인 화면
      </h1>
      <div className={`grid gap-6 grid-cols-2 text-center`}>
      <Card>
      <CardHeader> <strong>기업</strong> </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center ">
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Gesturing%20No.png" alt="Man Gesturing No" width="200" height="200" />  
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          혼잡해요 !
        </CardFooter>
      </Card>
      <Card>
        <CardHeader> <strong>기업</strong> </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center ">
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Gesturing%20OK.png" alt="Man Gesturing OK" width="200" height="200" />
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          원활해요 !
        </CardFooter>
      </Card>
      </div>
    </main>
  );
}
