import type React from "react"
import type { Metadata } from "next"
import AuthAnimation from "@/components/auth/AuthAnimation"

export const metadata: Metadata = {
  title: "Join ScrapLink | Revolutionary Scrap Metal Trading",
  description: "Access your scrap metal trading dashboard and start earning from your materials",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-inter">
      <div className="hidden lg:block lg:w-1/2 lg:h-screen lg:fixed lg:left-0 lg:top-0 overflow-hidden">
        <AuthAnimation />
      </div>
      <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen overflow-y-auto">
        <div className="min-h-screen">{children}</div>
      </div>
    </div>
  )
}
