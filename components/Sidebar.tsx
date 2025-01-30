import Link from "next/link"
import { Button } from "./ui/button"

export default function Sidebar() {
  return (
    <div>
      <div className="flex flex-col items-start space-y-3">
        <Button asChild>
          <Link href="/debugger">New Debug Chat</Link>
        </Button>
        <Button asChild>
          <Link href="/create-function">New Function Chat</Link>
        </Button>
        <Button asChild>
          <Link href="/summarize">New Summary</Link>
        </Button>
        <Button asChild>
          <Link href="/ask">New Question</Link>
        </Button>
      </div>
    </div>
  )
}
