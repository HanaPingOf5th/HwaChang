'use client';

import { HouseEmoji, EnterPriseEmoji } from "@/app/ui/component/atom/fluent-emoji";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";
import Link from "next/link";
import red_eclipse from "@/app/utils/public/red_eclipse.svg";
import green_eclipse from "@/app/utils/public/green_eclipse.svg";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [individualWaitTime, setIndividualWaitTime] = useState<number>(3);
  const [companyWaitTime, setCompanyWaitTime] = useState<number>(99);
  
  // setIndividualWaitTime(3);
  // setCompanyWaitTime(11);

  return (
    <main>
      <div className={`grid mx-8 pt-24 gap-28 grid-cols-2 text-center `}>
        <Link href='./main/enterance?isIndividual=true'>
          <Card className="shadow-lg hover:bg-green-50" style={{ boxShadow:'0 0 10px 0 #1FAB89' }}>
          <CardHeader> <p className="text-8xl mt-12 mb-16" style={{ color: '#1FAB89' }}>
            <strong>개인</strong>
            </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <HouseEmoji heignt={300} width={300}/>
                </div>
              <div className="flex justify-center items-center pt-24 text-2xl">
                <p className="text-black font-semibold mr-2"><strong>예상 대기 시간 :</strong></p>
                <p className={individualWaitTime>10? "text-red-500" : "text-blue-400"}><strong>{individualWaitTime}분</strong></p>
              </div>
              
            </CardContent>
            <CardFooter className="flex gap-2 justify-center mb-16">
              {individualWaitTime>10 ? 
                <>
                  <p className="text-2xl font-semibold">혼잡 상태</p>
                  <Image src={red_eclipse} alt="red_eclipse" width={20} height={20} />
                </> :
                <>
                  <p className="text-2xl font-semibold">원활 상태</p>
                  <Image src={green_eclipse} alt='green_eclipse' width={20} height={20}/>
                </>
              }
            </CardFooter>
          </Card>
        </Link>

        <Link href='./main/enterance?isIndividual=false'>
          <Card className="bg-hwachang-darkgreen hover:bg-hwachang-green" style={{ boxShadow:'0 0 10px 0 #1FAB89'}} >
            <CardHeader> <p className="text-8xl mt-12 mb-16 text-white"><strong>기업</strong></p> </CardHeader>
            <CardContent>
              <div className="flex flex-col justify-center items-center ">
                <EnterPriseEmoji heignt={300} width={300}/>
              </div>
              <div className="flex justify-center items-center pt-24 text-2xl">
                <p className="text-white mr-2 font-semibold"><strong>예상 대기 시간 :</strong></p>
                <p className={companyWaitTime>10? "text-red-500" : "text-blue-300"}><strong>{companyWaitTime}분</strong></p>
              </div>
              
            </CardContent>
            <CardFooter className="justify-center mb-16 flex gap-2">
              {companyWaitTime>10 ? 
                <>
                  <p className="text-2xl font-semibold">혼잡 상태</p>
                  <Image src={red_eclipse} alt="red_eclipse" width={20} height={20} />
                </> :
                <>
                  <p className="text-2xl font-semibold">원활 상태</p>
                  <Image src={green_eclipse} alt='green_eclipse' width={20} height={20}/>
                </>
              }
            </CardFooter>
          </Card>
        </Link>
      </div>
    </main>
  );
}
