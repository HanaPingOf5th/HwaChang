'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/component/molecule/card/card";
import { useSearchParams } from "next/navigation";
import { customerCategories, enterpriseCategories } from "./categories";

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

  const Categories:JSX.Element[] = pageCategory.map((value)=>{
    const Icon = value.icon;
    return(
      <>
        <Card className="bg-hwachang-green text-white">
          <CardHeader className="text-3xl">
            <strong>{value.title}</strong>
          </CardHeader>
          <CardContent className="pt-8" />
          <CardFooter className="items-end justify-end">
            <Icon color="white" size={100}></Icon>
          </CardFooter>
        </Card>
      </>
    )
  })
  
  return (
    <main>
      <h1 className={` mb-4 text-4xl md:text-4xl text-center`} >
        <strong>{pageTitle}</strong>
      </h1>
      <div className="py-2">
        <h1 className={` mb-4 text-xl md:text-2xl text-center`} >
          <strong>어떤 업무를 원하시나요?</strong>
        </h1>
      </div>
    
      <div className="grid gap-6 sm:grid-rows-2 lg:grid-rows-4 text-center">
        <div className={`grid gap-6 grid-cols-3 text-center`}>
          {Categories}
        </div>
      </div>
    </main>
  );
}
