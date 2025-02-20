"use client"
import { debugCode } from "@/action/server"
import React, { useEffect, useRef, useState, useTransition } from "react"
import { IoMdSend } from "react-icons/io"
import { ImSpinner2 } from "react-icons/im"
import type { ChatCompletionMessageParam as chatType } from "groq-sdk/resources/chat/completions.mjs"
import { useParams } from "next/navigation"
import ReactMarkdown from "react-markdown"

type TempData = {
  uuid: string
  code: string
  error: string
}

async function getReply(array: chatType[]) {
  const reply = await debugCode(array)
  return reply
}

export default function DebuggerConversation() {
  const [conversation, setConversation] = useState<chatType[] | []>([])
  const [newQuestion, setNewQuestion] = useState<string>("")
  const newQuestionRef = useRef<HTMLTextAreaElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)

  const [isGettingReply, startGettingReply] = useTransition()

  const conversationId = useParams().id as string

  async function handleSubmitNewQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const question = formData.get("question") as string

    if (question.trim() !== "") {
      startGettingReply(async () => {
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
      })
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

        const chat: chatType[] = [
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
  useEffect(() => {
    if (newQuestionRef.current) {
      newQuestionRef.current.style.height = "auto"
      newQuestionRef.current.style.height =
        newQuestionRef.current.scrollHeight + 4 + "px"
    }
  }, [newQuestion])

  return (
    <>
      {conversation.length > 0 && (
        <div className="flex flex-col items-center justify-end h-full py-6">
          <div className="w-[90%] max-w-[700px] overflow-y-scroll scrollbar-none grow flex flex-col  gap-3 justify-end">
            <div
              ref={conversationRef}
              className="overflow-y-scroll pb-3 flex flex-col gap-5 scrollbar-none"
            >
              {conversation.map((message: chatType, index: number) => (
                <ReactMarkdown
                  key={index}
                  className={` max-w-full w-full whitespace-normal break-words text-justify space-y-2 leading-7 ${
                    message.role === "user"
                      ? "bg-green-500 w-max max-w-[90%] p-3 rounded-lg self-end"
                      : ""
                  }`}
                  components={{
                    // Ensure code blocks wrap and don't overflow
                    code: ({ ...props }) => (
                      <code
                        {...props}
                        className="whitespace-pre-wrap break-words"
                      />
                    ),
                    // Ensure pre blocks wrap and don't overflow
                    pre: ({ ...props }) => (
                      <pre
                        {...props}
                        className="whitespace-pre-wrap break-words m-4 bg-[#333] p-2 rounded"
                      />
                    ),
                  }}
                >
                  {message.content as string}
                </ReactMarkdown>
              ))}
            </div>
          </div>

          <form
            className=" flex bg-background-textbox items-end w-[95%] max-w-[750px] p-4 rounded-3xl h-max "
            onSubmit={handleSubmitNewQuestion}
          >
            <textarea
              className="bg-transparent text-foreground-secondary placeholder:text-[#555]  grow p-2 resize-none focus:outline-none max-h-[30vh] overflow-y-auto scrollbar-thin"
              placeholder="Ask more questions"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              rows={1}
              ref={newQuestionRef}
              name="question"
              style={{ overflowY: "auto" }}
            />

            <button
              type="submit"
              className="bg-foreground rounded-full size-10 p-0 m-0 flex justify-center items-center"
              disabled={isGettingReply}
            >
              {!isGettingReply ? (
                <IoMdSend className="text-background size-6 " />
              ) : (
                <ImSpinner2 className="animate-spin text-background size-6 " />
              )}
            </button>
          </form>
        </div>
      )}
      {conversation.length === 0 && (
        <div className="flex h-full justify-center items-center">
          Loading... or No Conversation
        </div>
      )}
    </>
  )
}
