import Link from "next/link"

export default function Home() {
  return (
    <div className="w-[90vw] max-w-[600px] mx-auto flex flex-col justify-center items-center h-full">
      <div className="space-y-8">
        <h1 className="text-3xl">
          Hello, I&apos;m a Coding Assistant. What do you want me to help you
          with?
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/debugger"
            className="bg-green-100 px-4 py-2 text-black text-lg font-semibold rounded-xl hover:bg-green-200"
          >
            Debug Your Code
          </Link>
          <Link
            href="/create-function"
            className="bg-green-100 px-4 py-2 text-black text-lg font-semibold rounded-xl hover:bg-green-200"
          >
            Create a Function
          </Link>
        </div>
      </div>
    </div>
  )
}
