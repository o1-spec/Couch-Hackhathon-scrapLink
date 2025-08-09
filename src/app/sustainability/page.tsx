"use client"

import { EnvironmentalImpact } from "@/components/sustainability/EnvironmentalImpact"

export default function SustainabilityPage() {
  // Mock user data
  const user = {
    id: "1",
    name: "John Smith",
    userType: "seller" as const,
    joinDate: "2024-01-01",
  }

  return <EnvironmentalImpact user={user} />
}
