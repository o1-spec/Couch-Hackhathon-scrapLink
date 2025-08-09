'use client'

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface User {
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar: string
  verified: boolean
  joinedDate: string
}

interface EarningsChartProps {
  timeRange: string
  user: User
}

export function EarningsChart({ timeRange, user }: EarningsChartProps) {
  const getChartData = () => {
    switch (timeRange) {
      case '7d':
        return [
          { date: 'Jan 15', earnings: 120, orders: 2 },
          { date: 'Jan 16', earnings: 340, orders: 4 },
          { date: 'Jan 17', earnings: 180, orders: 3 },
          { date: 'Jan 18', earnings: 450, orders: 6 },
          { date: 'Jan 19', earnings: 280, orders: 3 },
          { date: 'Jan 20', earnings: 380, orders: 5 },
          { date: 'Jan 21', earnings: 520, orders: 7 }
        ]
      case '30d':
        return [
          { date: 'Week 1', earnings: 1200, orders: 15 },
          { date: 'Week 2', earnings: 1800, orders: 22 },
          { date: 'Week 3', earnings: 1450, orders: 18 },
          { date: 'Week 4', earnings: 2100, orders: 27 }
        ]
      case '90d':
        return [
          { date: 'Nov', earnings: 3200, orders: 42 },
          { date: 'Dec', earnings: 4100, orders: 53 },
          { date: 'Jan', earnings: 2340, orders: 31 }
        ]
      case '1y':
        return [
          { date: 'Q1', earnings: 8500, orders: 110 },
          { date: 'Q2', earnings: 12200, orders: 158 },
          { date: 'Q3', earnings: 9800, orders: 127 },
          { date: 'Q4', earnings: 11400, orders: 148 }
        ]
      default:
        return []
    }
  }

  const chartData = getChartData()

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 font-poppins">
        Earnings data for {user.name} ({timeRange})
      </div>
      <ChartContainer
        config={{
          earnings: {
            label: "Earnings ($)",
            color: "hsl(var(--chart-1))",
          },
          orders: {
            label: "Orders",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="earnings" 
              stroke="var(--color-earnings)" 
              strokeWidth={2}
              dot={{ fill: "var(--color-earnings)", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
