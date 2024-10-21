import { Card, CardHeader } from "@/app/ui/component/molecule/card/card";

export default function Home() {
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
        나의 용돈
      </h1>
      <h1 className={` mb-4 text-xl md:text-2xl text-center`} > 용돈: 100,000원</h1>
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4 text-center">
      <Card>
        <CardHeader>
          용돈 조르기
        </CardHeader>
      </Card>
      </div>
    </main>
  );
}