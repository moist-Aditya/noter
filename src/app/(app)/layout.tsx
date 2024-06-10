import LeftSideBar from "@/components/LeftSideBar"
import Navbar from "@/components/Navbar"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-primary-dark">
      <Navbar />

      <div className="flex flex-1 h-full justify-between">
        <LeftSideBar />

        <div className="flex-1 border p-4 border-slate-800 rounded-t-lg overflow-auto mx-2 mt-16">
          {children}
        </div>

        {/* <aside className=" bg-gradient-to-b from-background-dark to-background-light hidden sm:block">
          This is right sidebar
        </aside> */}
      </div>
    </div>
  )
}
