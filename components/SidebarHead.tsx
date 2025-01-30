import { TbLayoutSidebarLeftCollapse } from "react-icons/tb"

export default function SidebarHead({
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
      <TbLayoutSidebarLeftCollapse
        className={`transition-all duration-500 ${
          showSidebar ? "size-6" : "w-0 overflow-hidden"
        }`}
        onClick={() => {
          setShowSidebar(false)
        }}
      />
      SidebarHeader
    </div>
  )
}
