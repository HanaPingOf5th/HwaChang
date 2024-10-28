"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Profile from "@/app/utils/public/Profile.png";
import History from "@/app/utils/public/History.png";

interface navLinkType {
  name: string;
  href: string;
  icon: StaticImageData;
}

const links: navLinkType[] = [
  { name: "화상 창구", href: "/customer/main", icon: Profile },
  { name: "나의 화창 기록", href: "/customer/my-page", icon: History },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        const isSelected = pathName.startsWith(link.href);

        return (
          <div key={link.name}>
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                `flex h-[80px] grow items-center justify-start gap-2 p-3 text-[20px] font-medium mt-3 md:flex-none md:justify-start md:p-2 md:px-5`,
                isSelected
                  ? "bg-[#62D2A2] text-white rounded-full rounded-r-none ml-8"
                  : "bg-hwachang-darkgreen text-white rounded-md ml-8",
              )}
            >
              <Image
                src={link.icon}
                alt={`${link.name} Icon`}
                width={20}
                height={20}
                className="ml-7 mr-5 md:ml-8 lg:ml-10 xl:ml-12 2xl:ml-14" // ml-14에서 시작하고 줄어드는 마진 설정
              />
              <p>{link.name}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}
