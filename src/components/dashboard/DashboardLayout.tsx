"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Search,
  Heart,
  ShoppingCart,
  PlusCircle,
  DollarSign,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { SignOutDialog } from "../auth/SignoutDialog"

interface User {
  id: string
  name: string
  email: string
  userType: "seller" | "buyer"
  avatar: string
  location: string
  joinDate: string
  isVerified: boolean
}

interface DashboardLayoutProps {
  children: React.ReactNode
  user: User
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [showSignOutDialog, setShowSignOutDialog] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [unreadNotifications] = useState(3) // Mock unread count

  const sellerNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "My Listings", href: "/dashboard/listings" },
    { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: DollarSign, label: "Earnings", href: "/dashboard/earnings" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  const buyerNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Search, label: "Browse", href: "/dashboard/browse" },
    { icon: Heart, label: "Favorites", href: "/dashboard/favorites" },
    { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  const navItems = user.userType === "seller" ? sellerNavItems : buyerNavItems

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#006636] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SL</span>
                </div>
                <span className="font-bold text-xl text-gray-900 font-poppins">ScrapLink</span>
              </Link>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {user.userType === "seller" && (
                <Button
                  size="sm"
                  className="bg-[#006636] hover:bg-[#005528] text-white font-poppins hidden sm:flex"
                  asChild
                >
                  <Link href="/dashboard/listings/create">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Listing
                  </Link>
                </Button>
              )}

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative" asChild>
                <Link href="/notifications">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {unreadNotifications}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900 font-poppins">{user.name}</p>
                  <p className="text-xs text-gray-600 font-poppins capitalize">
                    {user.userType} {user.isVerified && "• Verified"}
                  </p>
                </div>
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </div>

              {/* Sign Out */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSignOutDialog(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${showMobileMenu ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors font-poppins
                      ${isActive ? "bg-[#006636] text-white" : "text-gray-700 hover:bg-gray-100"}
                    `}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* User Info in Sidebar */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate font-poppins">{user.name}</p>
                  <p className="text-xs text-gray-600 truncate font-poppins">{user.location}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {showMobileMenu && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">{children}</main>
      </div>

      {/* Sign Out Dialog */}
      <SignOutDialog isOpen={showSignOutDialog} onClose={() => setShowSignOutDialog(false)} user={user} />
    </div>
  )
}
