"use client"

import MainSectionHead from "./MainSectionHead"

export default function Interface({
  mainSection,
}: {
  mainSection: React.ReactNode
}) {
  return (
    <div className="flex w-screen h-[100dvh] max-h-[100dvh] overflow-hidden">
      {/* sidebar */}

      {/* mainsection */}
      <div className=" flex grow flex-col overflow-hidden ">
        <MainSectionHead className="bg-background-header min-h-10" />
        <div className=" grow overflow-hidden">{mainSection}</div>
      </div>
    </div>
  )
}
