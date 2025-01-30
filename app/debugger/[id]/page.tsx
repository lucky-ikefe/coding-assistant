"use client"
import { debugCode } from "@/action/server"
import React, { useEffect, useRef, useState, useTransition } from "react"
import { IoMdSend } from "react-icons/io"
import type { ChatCompletionMessageParam as chatType } from "groq-sdk/resources/chat/completions.mjs"
import { useParams } from "next/navigation"

type TempData = {
  uuid: string
  code: string
  error: string
}

async function getReply(array) {
  const reply = await debugCode(array)
  return reply
}

export default function DebuggerConversation() {
  const [conversation, setConversation] = useState<chatType[] | []>([])
  const [newQuestion, setNewQuestion] = useState<string>("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)

  const [isGettingReply, startGettingReplyTransition] = useTransition()

  const conversationId = useParams().id as string

  async function handleSubmitNewQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const question = formData.get("question") as string

    if (question.trim() !== "") {
      const debugHistory = JSON.parse(
        localStorage.getItem("debugHistory") || "{}"
      )

      const newChat: chatType = { role: "user", content: question }
      setConversation((prev) => [...prev, newChat])

      debugHistory[conversationId]?.push(newChat)

      localStorage.setItem("debugHistory", JSON.stringify(debugHistory))

      const reply = await getReply(debugHistory[conversationId])
      debugHistory[conversationId] = reply
      localStorage.setItem("debugHistory", JSON.stringify(debugHistory))

      setConversation(reply)
      setNewQuestion("")
    }
  }

  useEffect(() => {
    const storedData = localStorage.getItem("tempDebugData")
    const unparsedDebugHistory = localStorage.getItem("debugHistory")

    // If tempdebugdata exist
    if (storedData) {
      ;(async function () {
        const tempData: TempData = JSON.parse(storedData)
        localStorage.removeItem("tempDebugData")

        const unparsedDebugHistory = localStorage.getItem("debugHistory")
        const debugHistory = unparsedDebugHistory
          ? JSON.parse(unparsedDebugHistory)
          : {}

        const chat = [
          {
            role: "user",
            content: `This is the code: ${tempData.code}. \n  While this is the error brought by the code: ${tempData.error}`,
          },
        ]

        const chatReply = await getReply(chat)

        const newDebugHistory = {
          ...debugHistory,
          [tempData.uuid]: chatReply,
        }

        const conversationArray = newDebugHistory[conversationId]
        console.log("new debug: ", conversationArray)

        localStorage.setItem("debugHistory", JSON.stringify(newDebugHistory))
        setConversation(conversationArray)
      })()
    } else if (unparsedDebugHistory) {
      const conversationArray = JSON.parse(unparsedDebugHistory)
      if (conversationArray[conversationId]) {
        console.log("Loading previous data")
        setConversation(conversationArray[conversationId])
      } else {
        setConversation([])
      }
    } else {
      setConversation([])
    }
  }, [conversationId])

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight
    }
  }, [conversation])

  return (
    <>
      {conversation.length > 0 && (
        <div className="flex flex-col items-center justify-end h-full pb-6 ">
          <div
            className="w-1/2 overflow-y-scroll scrollbar-none grow flex flex-col gap-3 pb-3"
            ref={conversationRef}
          >
            {conversation.map((message: chatType, index: number) => (
              <div
                key={index}
                className={`break-words text-justify hyphens-auto ${
                  message.role === "user"
                    ? "bg-green-500 w-max max-w-[90%] p-3 rounded-lg self-end"
                    : ""
                }`}
              >
                {message.content as string}
              </div>
            ))}
          </div>

          <form
            className=" flex border-2 bg-green-200 items-center w-[55%] min-h-[13%] max-h-[30%] overflow-y-auto p-2 rounded-3xl"
            onSubmit={handleSubmitNewQuestion}
          >
            <textarea
              className="bg-inherit text-black placeholder:text-[#555]  h-full grow resize-none p-2 focus:outline-none"
              placeholder="Ask more questions"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              rows={1}
              ref={textAreaRef}
              name="question"
            />

            <button
              type="submit"
              className="bg-white rounded-full size-10 p-0 m-0 flex justify-center items-center "
            >
              <IoMdSend className="text-green-800 size-6 " />
            </button>
          </form>
        </div>
      )}
      {conversation.length === 0 && <div>No Conversation</div>}
    </>
  )
}
