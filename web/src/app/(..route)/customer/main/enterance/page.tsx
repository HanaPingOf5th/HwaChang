'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";
import { useSearchParams } from "next/navigation";
import { customerCategories, enterpriseCategories } from "./categories";
import Link from "next/link";

export default function Home() {
  //To-Do: userSearchParam 이용해서 isIndividual의 값에 따라 컴포넌트 내에서 다른 내용 보여주기
  const params = useSearchParams();
  const key = params.get('isIndividual');
  let pageTitle;
  let pageCategory;
  if(key==='true'){
    pageTitle = '개인 금융'
    pageCategory = customerCategories
  }else{
    pageTitle = '기업 금융'
    pageCategory = enterpriseCategories
  }

  const Categories:JSX.Element[] = pageCategory.map((value, index)=>{
    const Icon = value.icon;
    return(
      <main key={index}>
        <div className="p-2">
          <Link href={"/consulting-room?isWait=true"}>
            <Card className="bg-hwachang-darkgreen text-white">
              <CardHeader className="text-2xl">
                <strong>{value.title}</strong>
              </CardHeader>
              <CardContent className="" />
              <CardFooter className="items-end justify-end">
                <Icon color="white" size='60'></Icon>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </main>
    )
  })
  
  return (
    <main>
      <div className="px-20">
        <h1 className={` mb-4 text-4xl md:text-4xl text-center`} >
          <strong>{pageTitle}</strong>
        </h1>

        <div className="">
          <h1 className={` mb-2 text-xl md:text-xl text-center`} >
            <strong>어떤 업무를 원하시나요?</strong>
          </h1>
        </div>
          <div className={`grid gap-3 grid-cols-3 text-center`}>
            {Categories}
          </div>
      </div>
    </main>
  );
}
