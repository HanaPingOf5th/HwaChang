'use client'
import AchromaticButton from "../component/atom/achromatic-button";
import NavLinks from "./nav-link";

export default function Nav() {
  return (
    <div className="flex h-full flex-col px-4 py-4 md:px-2">
      <div className="mb-2 flex h-20 justify-start items-center rounded-md bg-emerald-300 p-4 md:h-30 border-2\">
        <div className="text-white text-xl"> 화창</div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks/>
        <div className="hidden h-auto w-full grow rounded-md bg-emerald-10 md:block"></div>
        <AchromaticButton className="bg-red-50 hover:bg-red-100 text-red-600">나가기</AchromaticButton>
      </div>
    </div>
  )
}