"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import History from "@/app/utils/public/history.svg";
import Video from "@/app/utils/public/video.svg";
import SelectedVideo from "@/app/utils/public/selected-video.svg";
import SelectedHistory from "@/app/utils/public/selected-history.svg";

interface navLinkType {
  name: string;
  href: string;
  icon: StaticImageData;
  selectedIcon: StaticImageData;
}

const links: navLinkType[] = [
  { name: "화상 창구", href: "/customer/main", icon: Video, selectedIcon: SelectedVideo },
  { name: "화창 기록", href: "/customer/my-page", icon: History, selectedIcon: SelectedHistory },
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
                  ? "bg-white text-hwachang-accentmain rounded-l-full rounded-r-none ml-8"
                  : "bg-hwachang-main text-white md:rounded-l-full ml-8",
              )}
            >
              <Image
                src={isSelected ? link.selectedIcon : link.icon}
                alt={`${link.name} Icon`}
                width="22"
                height="22"
                className="ml-5"
              />
              <p className="md:hidden lg:block text-xl">{link.name}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}
