import Footer from "@/src/components/nav/Footer";
import Headers from "@/src/components/nav/Headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
      <Headers />
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  )
}
