'use client'

import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { PaymentSystem } from '@/components/payments/PaymentSystem'

// Mock user data - in real app this would come from auth context
const mockUser = {
  id: '1',
  name: 'John Smith',
  email: 'john@example.com',
  type: 'seller' as 'seller' | 'buyer',
  avatar: '/placeholder.svg?height=40&width=40',
  verified: true,
  joinedDate: '2024-01-15'
}

export default function PaymentsPage() {
  return (
    <DashboardLayout user={mockUser}>
      <PaymentSystem user={mockUser} />
    </DashboardLayout>
  )
}
