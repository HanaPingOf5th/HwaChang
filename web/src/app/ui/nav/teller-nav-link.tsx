"use client";
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Main from "@/app/utils/public/main.svg";
import Counsel from "@/app/utils/public/counsel.svg";
import SelectedMain from "@/app/utils/public/selected-main.svg";
import SelectedCounsel from "@/app/utils/public/selected-counsel.svg";

interface navLinkType {
  name: string;
  href: string;
}

const links: navLinkType[] = [
  { name: "나의 상담 현황", href: "/teller/main" },
  { name: "상담 하러 가기", href: "/teller/prepare" },
]

export default function TellerNavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        const isSelected = pathName === link.href;
        let imageSrc;

        // 선택 여부에 따른 아이콘 설정
        if (link.href === '/teller/main') {
          imageSrc = isSelected ? SelectedMain : Main;
        } else if (link.href === '/teller/prepare') {
          imageSrc = isSelected ? SelectedCounsel : Counsel;
        }

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] grow items-center
              gap-7 text-lg md:flex-none md:justify-start p-10`,
              {
                'bg-white text-green1 md:rounded-l-full': isSelected, // 선택된 link
                'text-white': !isSelected, // 선택되지 않은 link
              }
            )}
          >
            <Image
              src={imageSrc}
              alt={link.name}
              width={22}
              height={22}
              className="ml-5"
            />
            <p className="text-xl">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}