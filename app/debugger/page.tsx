"use client"

import TextArea from "@/components/TextArea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

export default function DebugCode() {
  type FormData = {
    code: string
    error: string
  }
  // const uuid = crypto.randomUUID()
  const uuid = uuidv4()

  const [formData, setFormData] = useState<FormData>({
    code: "",
    error: "",
  })

  const [errors, setErrors] = useState({
    code: "",
    error: "",
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
    const newErrors = { code: "", error: "" }
    const tempDebugData = {
      uuid: uuid,
      code: formData.code,
      error: formData.error,
    }

    if (!formData.code.trim()) {
      newErrors.code = "Please enter the code you want to debug"
    }

    if (!formData.error.trim()) {
      newErrors.error = "Please enter the error the code gives"
    }

    setErrors(newErrors)
    if (newErrors.code || newErrors.error) {
      return
    }

    //

    localStorage.setItem("tempDebugData", JSON.stringify(tempDebugData))

    router.push(`/debugger/${uuid}`)
  }

  return (
    <div className="flex justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="flex h-full  flex-col justify-center items-center space-y-10 w-3/4"
      >
        <div className="flex flex-col space-y-2 justify-center items-center  w-full h-max">
          <label htmlFor="code">Enter your code:</label>
          {errors.code && <div className="text-destructive">{errors.code}</div>}
          <TextArea
            name="code"
            id="code"
            value={formData.code}
            onChange={handleChange}
            className={`${errors.code ? "border-red-500 border-2" : ""}`}
          />
        </div>
        <div className="flex flex-col space-y-2 justify-center items-center  w-full h-max">
          <label htmlFor="error">
            Enter the error (or any other explanation):
          </label>
          {errors.error && (
            <div className="text-destructive">{errors.error}</div>
          )}
          <TextArea
            name="error"
            id="error"
            value={formData.error}
            onChange={handleChange}
            className={` ${errors.code ? "border-red-500 border-2" : ""}`}
          />
        </div>
        <Button type="submit">Debug Code</Button>
      </form>
    </div>
  )
}
