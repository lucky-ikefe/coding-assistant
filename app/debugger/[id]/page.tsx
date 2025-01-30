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
        <div className="flex flex-col items-center justify-end h-full pb-6 gap-3 border-2 border-white">
          <div
            className="w-1/2 flex flex-col gap-3  overflow-y-scroll  justify-end border-4 border-blue-600 grow"
            ref={conversationRef}
          >
            {conversation.map((message: chatType, index: number) => (
              <div
                key={index}
                className={`border-2 border-white text-justify hyphens-auto ${
                  message.role === "user"
                    ? "bg-accent max-w-[90%] self-end p-3 rounded-lg "
                    : ""
                }`}
              >
                {/* {message.role === "user" ? (
                  <div className="border-2 border-red-600 break-words text-justify">
                    {message.content as string}
                  </div>
                ) : (
                  ""
                )}
                {message.role !== "user" ? (message.content as string) : ""} */}
                {message.content as string}
              </div>
            ))}
          </div>

          <form
            className=" flex border-2 border-yellow-700 items-end w-[55%] min-h-[13%] max-h-[30%] overflow-y-auto p-2"
            onSubmit={handleSubmitNewQuestion}
          >
            <textarea
              className="h-full grow resize-none p-2"
              placeholder="Ask more questions"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              rows={1}
              ref={textAreaRef}
              name="question"
            />

            <button
              type="submit"
              className="border-2 border-green-700 w-[7%] h-8 p-0 m-0 flex justify-center items-center "
            >
              <IoMdSend className="h-8" />
            </button>
          </form>
        </div>
      )}
      {conversation.length === 0 && <div>No Conversation</div>}
    </>
  )
}
