"use client"

import { DisputeResolution } from "../../components/dispute/DisputeResolution"

export default function DisputePage() {
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
    amount: 245.0,
    otherParty: "Metro Demolition Co.",
  }

  return <DisputeResolution user={user} orderData={orderData} />
}
