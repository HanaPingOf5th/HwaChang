'use client'
import { Card, CardContent, CardFooter } from "@/app/ui/component/molecule/card/card";
import Banker from '@/app/utils/public/banker.png';
import { NameTag } from "@/app/ui/component/atom/tag/name-tag";
import { cn } from "@/app/utils/style";

interface ViewProps {
  isTop?: boolean;
  isSide?: boolean;
}
export function MainView({ isTop = false, isSide = false }: ViewProps) {
  return (
    <>
      {/* 은행원 화면 ToDo: 배경 이미지 대신 웹소켓으로 받은 실시간 데이터를 보여주기 */}
      <Card className={cn(`bg-cover bg-center`, isTop ? null : 'h-[520px]', isSide ? 'w-[100px]' : null)} style={{ backgroundImage: `url(${Banker.src})` }}>
        <CardContent>
          <div className={cn(isTop ? 'p-14' : 'p-56')} />
        </CardContent>
        <CardFooter>
          <NameTag name="이수민" />
        </CardFooter>
      </Card>
    </>
  )
}