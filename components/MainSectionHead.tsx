import Link from "next/link"
import { ThemeToggle } from "./ThemeToogle"
import { TbLayoutSidebarLeftExpand } from "react-icons/tb"

export default function MainSectionHead({ className }: { className: string }) {
  return (
    <div className={`px-2 flex justify-between items-center ${className}`}>
      <div className="flex gap-2 items-center">
        <TbLayoutSidebarLeftExpand
          className={` opacity-0 transition-all duration-500`}
        />
      </div>
      <Link href="/">Coding Assistant</Link>
      <ThemeToggle />
    </div>
  )
}
