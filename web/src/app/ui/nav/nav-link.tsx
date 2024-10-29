"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";
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
      {links.map((link, index) => {
        const isSelected = pathName.startsWith(link.href);

        return (
          <div key={index}>
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                `flex h-[48px] grow items-center
              gap-7 text-lg md:flex-none md:justify-start p-10`,
                isSelected
                  ? "bg-[#62D2A2] text-white rounded-l-full rounded-r-none ml-8"
                  : "bg-hwachang-darkgreen text-white md:rounded-l-full ml-8",
              )}
            >
              <Image
                src={link.icon}
                alt={`${link.name} Icon`}
                width="22"
                height="22"
                className="ml-5"
              />
              <p className="text-xl">{link.name}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}
