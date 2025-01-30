"use client"
import { debugCode } from "@/action/server"
import React, { useEffect, useRef, useState } from "react"
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
      const newDebugHistory = {
        ...debugHistory,
        [conversationId]: [...debugHistory[conversationId], newChat],
      }
      localStorage.setItem("debugHistory", newDebugHistory)
      setNewQuestion("")
      const reply = await getReply(conversation)
      setConversation(reply)
    }
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "100%"
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
    }
  }, [newQuestion])

  useEffect(() => {
    // async function getReply(array) {
    //   const reply = await debugCode(array)
    //   return reply
    // }

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
        // setConversation(chatReply)

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
  console.log("conversation: ", conversation)
  return (
    <div className="w-full h-full overflow-hidden">
      {conversation.length > 0 && (
        <div className="w-full flex flex-col items-center justify-end border-2 border-yellow-700 h-full max-h-full pb-6 gap-3">
          <div className="w-1/2 border-2 border-red-700">
            <div className="flex flex-col  w-full items gap-3">
              {conversation.map((message: chatType, index: number) => (
                <div
                  key={index}
                  className={
                    message.role === "user"
                      ? "bg-accent w-5/6 self-end p-3 rounded-lg"
                      : ""
                  }
                >
                  {message.content as string}
                </div>
              ))}
            </div>
          </div>

          <form
            className=" flex border-2 border-yellow-700 items-end w-[55%] min-h-[10%] max-h-[30%] overflow-y-auto"
            onSubmit={handleSubmitNewQuestion}
          >
            <textarea
              className="h-full grow resize-none"
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
    </div>
  )
}
