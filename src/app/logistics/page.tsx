"use client"

import { LogisticsManager } from "../../components/logistics/LogisticsManager"


export default function LogisticsPage() {
  // Mock user and order data
  const user = {
    id: "1",
    name: "John Smith",
    userType: "seller" as const,
  }

  const orderData = {
    id: "ORD-2024-001",
    material: "Copper Wire",
    weight: 50,
    pickupAddress: "123 Industrial Ave, Chicago, IL 60601",
    deliveryAddress: "456 Factory Rd, Detroit, MI 48201",
    distance: 284,
    value: 245.0,
  }

  return <LogisticsManager user={user} orderData={orderData} />
}
