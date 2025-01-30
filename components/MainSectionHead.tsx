import { ThemeToggle } from "./ThemeToogle"
import { TbLayoutSidebarLeftExpand } from "react-icons/tb"

export default function MainSectionHead({
  className,
  showSidebar,
  setShowSidebar,
}: {
  className: string
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className={`px-2 flex justify-between items-center ${className}`}>
      <div className="flex gap-2 items-center">
        <TbLayoutSidebarLeftExpand
          onClick={() => {
            setShowSidebar(true)
          }}
          className={`transition-all duration-500 ${
            !showSidebar ? "size-6" : "w-0 overflow-hidden"
          }`}
        />
      </div>
      <p>Coding Assistant</p>
      <ThemeToggle />
    </div>
  )
}
