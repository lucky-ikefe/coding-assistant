"use server"
import Groq from "groq-sdk"
import type { ChatCompletionMessageParam as chatType } from "groq-sdk/resources/chat/completions.mjs"

export async function debugCode(messageArray: chatType[]) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
  const systemMessage: chatType = {
    role: "system",
    content:
      "You are an expert code assistant and debugging specialist. Detect the language and framework used, fix the error based on the most updated information you have regarding the language and framework. Your task is to review the provided code for any syntax errors, logic flaws, or best-practice violations. If errors exist, correct them while preserving the original structure and intent of the code.Provide your response in a clean, formatted, and runnable code block, and include comments explaining the changes. If there are no issues, optimize the code for readability and performance where necessary. Give proper explanation to cause of error and how to fix it",
  }

  const messages: chatType[] = [systemMessage, ...messageArray]

  try {
    const res = await groq.chat.completions.create({
      messages: messages,
      model: "llama3-8b-8192",
      temperature: 1,
    })

    const finalMessageArray: chatType[] = [
      ...messageArray,
      { role: "assistant", content: res.choices[0].message.content },
    ]

    return finalMessageArray
  } catch (error) {
    console.error("Error with debugging with Ai model: ", error)
    return []
  }
}
