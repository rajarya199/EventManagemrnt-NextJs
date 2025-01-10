import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
      <h1 className="px-3">Event Globe</h1>
        </Link>

        <p>@2025 EventGlobe. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer