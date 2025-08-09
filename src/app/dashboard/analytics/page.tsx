'use client'

import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'

const mockUser = {
  id: '1',
  name: 'John Smith',
  email: 'john@example.com',
  type: 'seller' as 'seller' | 'buyer',
  avatar: '/avatar-placeholder.svg',
  verified: true,
  joinedDate: '2024-01-15',
  location: 'New York, USA',
  userType: 'seller' as 'seller' | 'buyer', // or 'buyer', depending on your needs
  joinDate: '2024-01-15', // match the format expected by User interface
  isVerified: true
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout user={mockUser}>
      <AnalyticsDashboard user={mockUser} />
    </DashboardLayout>
  )
}
