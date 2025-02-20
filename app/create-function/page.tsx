"use client"

import TextArea from "@/components/TextArea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

export default function CreateFunction() {
  type FormData = {
    language: string
    description: string
  }
  // const uuid = crypto.randomUUID()
  const uuid = uuidv4()

  const [formData, setFormData] = useState<FormData>({
    language: "",
    description: "",
  })

  const [errors, setErrors] = useState({
    language: "",
    description: "",
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = { language: "", description: "" }
    const tempFunctionData = {
      uuid: uuid,
      language: formData.language,
      description: formData.description,
    }

    if (!formData.language.trim()) {
      newErrors.language = "Please enter the language of the function"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please describe the function"
    }

    setErrors(newErrors)
    if (newErrors.language || newErrors.description) {
      return
    }

    //

    localStorage.setItem("tempFunctionData", JSON.stringify(tempFunctionData))

    router.push(`/create-function/${uuid}`)
  }

  return (
    <div className="flex justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="flex h-full  flex-col justify-center items-center space-y-10 w-3/4"
      >
        <div className="flex flex-col space-y-2 justify-center items-center  w-full h-max">
          <label htmlFor="language">Enter the language for the function</label>
          {errors.language && (
            <div className="text-destructive">{errors.language}</div>
          )}
          <TextArea
            name="language"
            id="language"
            value={formData.language}
            onChange={handleChange}
            className={`w-[50%]  ${
              errors.language ? "border-red-500 border-2" : ""
            }`}
          />
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center  w-full h-max">
          <label htmlFor="description">
            What do you want the function to do:
          </label>
          {errors.description && (
            <div className="text-destructive">{errors.description}</div>
          )}
          <TextArea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className={` ${
              errors.description ? "border-red-500 border-2" : ""
            }`}
          />
        </div>
        <Button type="submit">Create Function</Button>
      </form>
    </div>
  )
}
