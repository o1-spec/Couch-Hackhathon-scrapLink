'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Recycle, Home, Package, ShoppingCart, BarChart3, Settings, Bell, Search, Menu, X, LogOut, User, Shield, Heart, MessageSquare, Wallet } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar: string
  verified: boolean
  joinedDate: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  user: User
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications] = useState(3) // Mock notification count

  const sellerNavItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Package, label: 'My Listings', href: '/dashboard/listings', count: 12 },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: ShoppingCart, label: 'Orders', href: '/dashboard/orders', count: 5 },
    { icon: Wallet, label: 'Earnings', href: '/dashboard/earnings' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', count: 2 },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' }
  ]

  const buyerNavItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Search, label: 'Browse Scrap', href: '/dashboard/browse' },
    { icon: ShoppingCart, label: 'My Orders', href: '/dashboard/orders', count: 3 },
    { icon: Heart, label: 'Favorites', href: '/dashboard/favorites', count: 8 },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', count: 1 },
    { icon: Wallet, label: 'Payment Methods', href: '/dashboard/payments' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' }
  ]

  const navItems = user.type === 'seller' ? sellerNavItems : buyerNavItems

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#006636] rounded-lg flex items-center justify-center">
              <Recycle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 font-poppins">ScrapLink</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-[#006636] text-white font-poppins">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 truncate font-poppins">
                  {user.name}
                </p>
                {user.verified && (
                  <Shield className="h-4 w-4 text-green-600" />
                )}
              </div>
              <p className="text-xs text-gray-500 truncate font-poppins">{user.email}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs font-poppins capitalize">
            {user.type} Account
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors font-poppins ${
                    item.active
                      ? 'bg-[#006636] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1">{item.label}</span>
                  {item.count && (
                    <Badge variant="secondary" className="text-xs">
                      {item.count}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-gray-700 font-poppins">
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-poppins">
                  {user.type === 'seller' ? 'Seller Dashboard' : 'Buyer Dashboard'}
                </h1>
                <p className="text-sm text-gray-600 font-poppins">
                  Welcome back, {user.name.split(' ')[0]}!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006636] focus:border-transparent font-poppins"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* Profile */}
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
