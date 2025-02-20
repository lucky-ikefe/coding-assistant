import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        Hello, I am a Coding Assistant. What do you want me to help you with?
      </div>
      <div className="flex flex-col items-start space-y-3">
        <Button asChild>
          <Link href="/debugger">Debug My Code</Link>
        </Button>
        <Button asChild>
          <Link href="/create-function">Create A Function</Link>
        </Button>
        <Button asChild>
          <Link href="/summarize">Summarize My Code</Link>
        </Button>
        <Button asChild>
          <Link href="/ask">Ask other questions</Link>
        </Button>
      </div>
    </div>
  );
}
