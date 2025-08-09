'use client'

import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'

const mockUser = {
  id: '1',
  name: 'John Smith',
  email: 'john@example.com',
  type: 'seller' as 'seller' | 'buyer',
  avatar: '/placeholder.svg?height=40&width=40',
  verified: true,
  joinedDate: '2024-01-15'
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout user={mockUser}>
      <AnalyticsDashboard user={mockUser} />
    </DashboardLayout>
  )
}
