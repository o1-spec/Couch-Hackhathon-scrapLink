"use client"

import { FavoritesSection } from "@/components/favorites/FavoritesSection"

const mockUser = {
  id: "1",
  name: "John Smith",
  email: "john@example.com",
  userType: "buyer" as const,
  avatar: "/placeholder.svg?height=40&width=40&text=JS",
  location: "Chicago, IL",
  joinDate: "2024-01-15",
  isVerified: true,
}

export default function FavoritesPage() {
  return <FavoritesSection user={mockUser} />
}
