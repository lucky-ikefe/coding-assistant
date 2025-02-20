"use client"

import { ChangeEventHandler, useEffect, useRef } from "react"

export default function TextArea({
  name,
  id,
  value,
  onChange,
  className,
}: {
  name: string
  id: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  className?: string
}) {
  const textArea = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (textArea.current) {
      textArea.current.style.height = "auto"
      textArea.current.style.height = textArea.current.scrollHeight + 4 + "px"
    }
  }, [value])
  return (
    <div
      className={`bg-background-header inline-flex w-full py-4 rounded-[1rem] ${
        className || ""
      } focus-within:border-green-100 focus-within:border-2`}
    >
      <textarea
        className="bg-transparent text-foreground   grow p-2 resize-none focus:outline-none max-h-[20vh] overflow-y-auto scrollbar-none focus:scrollbar-thin  mx-6  "
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        rows={1}
        ref={textArea}
        style={{ overflowY: "auto" }}
      />
    </div>
  )
}
