'use client'

import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { ListingManagement } from '@/components/listings/ListingManagement'

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

export default function ListingsPage() {
  return (
    <DashboardLayout user={mockUser}>
      <ListingManagement user={mockUser} />
    </DashboardLayout>
  )
}
