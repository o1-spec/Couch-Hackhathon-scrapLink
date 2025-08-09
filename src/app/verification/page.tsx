"use client"
import { PhysicalVerification } from "../../components/verification/PhysicalVerification"


export default function VerificationPage() {
  // Mock user and order data
  const user = {
    id: "1",
    name: "John Smith",
    userType: "buyer" as const,
    isVerified: true,
  }

  const orderData = {
    id: "ORD-2024-001",
    title: "Premium Copper Wire Bundle - 50lbs",
    estimatedWeight: 50,
    estimatedValue: 245.0,
    aiPhotos: [
      "/placeholder.svg?height=200&width=300&text=Copper+Wire+1",
      "/placeholder.svg?height=200&width=300&text=Copper+Wire+2",
    ],
    material: "Copper",
  }

  return <PhysicalVerification user={user} orderData={orderData} />
}
