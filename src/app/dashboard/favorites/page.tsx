"use client"

import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { FavoritesSection } from "@/components/favorites/FavoritesSection"

const mockUser = {
  id: "1",
  name: "John Smith",
  email: "john@example.com",
  userType: "buyer" as const,
  avatar: '/avatar-placeholder.svg',
  location: "Chicago, IL",
  joinDate: "2023-06-15",
  isVerified: true,
}

export default function FavoritesPage() {
  return (
    <DashboardLayout user={mockUser}>
      <FavoritesSection user={mockUser} />
    </DashboardLayout>
  )
}
