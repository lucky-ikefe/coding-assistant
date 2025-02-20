import Link from "next/link"

export default function MainSectionHead({ className }: { className: string }) {
  return (
    <div className={` ${className}`}>
      <Link href="/" className="mx-auto w-fit block mt-3 text-lg">
        Lucky&apos;s Coding Assistant
      </Link>
    </div>
  )
}
