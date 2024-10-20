'use client'
import NavLinks from "./nav-link";

export default function Nav() {
  return (
    <div className="flex h-full flex-col px-4 py-4 md:px-2">
      <div className="mb-2 flex h-20 justify-start items-center rounded-md bg-emerald-300 p-4 md:h-30 border-2\">
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks/>
        <div className="hidden h-auto w-full grow rounded-md bg-emerald-10 md:block"></div>
        <form>
          <button
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-white-50 p-3 text-sm text-emerald-800 font-medium hover:bg-emerald-50 hover:text-emerald-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  )
}