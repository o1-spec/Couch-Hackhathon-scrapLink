'use client'

import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { MessagingSystem } from '@/components/messaging/MessagingSystem'

const mockUser = {
  id: '1',
  name: 'John Smith',
  email: 'john@example.com',
  type: 'seller' as 'seller' | 'buyer',
  avatar: '/placeholder.svg?height=40&width=40',
  verified: true,
  joinedDate: '2024-01-15'
}

export default function MessagesPage() {
  return (
    <DashboardLayout user={mockUser}>
      <MessagingSystem user={mockUser} />
    </DashboardLayout>
  )
}
