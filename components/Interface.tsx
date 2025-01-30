"use client"

import { useState, useEffect } from "react"
import MainSectionHead from "./MainSectionHead"
import SidebarHead from "./SidebarHead"

export default function Interface({
  sidebar,
  mainSection,
}: {
  sidebar: React.ReactNode
  mainSection: React.ReactNode
}) {
  const [showSidebar, setShowSidebar] = useState<boolean>(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    setShowSidebar(mediaQuery.matches)

    const handleResize = () => setShowSidebar(mediaQuery.matches)

    mediaQuery.addEventListener("change", handleResize)

    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [])

  return (
    <div className="flex w-screen h-screen max-h-screen overflow-hidden">
      {/* sidebar */}

      <aside
        className={`transition-all overflow-hidden max-w-[250px] duration-500 flex flex-col dark:bg-secondary-background ${
          showSidebar ? "min-w-[250px] grow " : "w-0  "
        }`}
      >
        <SidebarHead
          className=" border-b-green-500 border-b-2 h-10"
          setShowSidebar={setShowSidebar}
        />
        <div className=" grow">{sidebar}</div>
      </aside>

      {/* mainsection */}
      <div className=" flex grow flex-col max-h-screen overflow-hidden ">
        <MainSectionHead
          className=" border-b-green-500 border-b-2 h-10"
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <div className=" grow border-2 border-red-600 overflow-hidden">
          {mainSection}
        </div>
      </div>
    </div>
  )
}
