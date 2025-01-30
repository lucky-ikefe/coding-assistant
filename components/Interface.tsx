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
        className={`transition-all overflow-hidden max-w-[250px] duration-300 flex flex-col dark:bg-secondary-background grow ${
          showSidebar ? "w-full grow " : "w-0  "
        }`}
      >
        <SidebarHead
          className=" h-10"
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />
        <div className=" grow">{sidebar}</div>
      </aside>

      {/* mainsection */}
      <div className=" flex grow flex-col overflow-hidden ">
        <MainSectionHead
          className=" h-10"
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <div className=" grow overflow-hidden">{mainSection}</div>
      </div>
    </div>
  )
}
