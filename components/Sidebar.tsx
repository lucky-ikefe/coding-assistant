import Link from "next/link";
import { Button } from "./ui/button";

export default function Sidebar() {
  return (
    <div>
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
