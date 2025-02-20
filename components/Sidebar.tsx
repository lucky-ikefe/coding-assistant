import Link from "next/link"
import { Button } from "./ui/button"

export default function Sidebar() {
  return (
    <div>
      <div className="flex flex-col items-start space-y-3">
        <Link href="/debugger">New Debug Chat</Link>

        <Link href="/create-function">New Function Chat</Link>

        <Link href="/summarize">New Summary</Link>

        <Link href="/ask">New Question</Link>
      </div>
    </div>
  )
}
