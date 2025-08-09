'use client'

import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface RevenueChartProps {
  timeRange: string
}

interface RevenueData {
  name: string
  revenue: number
  target: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
  }>
  label?: string
}

export function RevenueChart({ timeRange }: RevenueChartProps) {
  // Mock data based on time range
  const getData = (): RevenueData[] => {
    switch (timeRange) {
      case '7d':
        return [
          { name: 'Mon', revenue: 1450, target: 1200 },
          { name: 'Tue', revenue: 980, target: 1200 },
          { name: 'Wed', revenue: 1890, target: 1200 },
          { name: 'Thu', revenue: 720, target: 1200 },
          { name: 'Fri', revenue: 2340, target: 1200 },
          { name: 'Sat', revenue: 2890, target: 1200 },
          { name: 'Sun', revenue: 1680, target: 1200 }
        ]
      case '30d':
        return [
          { name: 'Week 1', revenue: 5400, target: 5000 },
          { name: 'Week 2', revenue: 6240, target: 5000 },
          { name: 'Week 3', revenue: 4560, target: 5000 },
          { name: 'Week 4', revenue: 7320, target: 5000 }
        ]
      case '90d':
        return [
          { name: 'Month 1', revenue: 18720, target: 15000 },
          { name: 'Month 2', revenue: 22680, target: 15000 },
          { name: 'Month 3', revenue: 17040, target: 15000 }
        ]
      case '1y':
        return [
          { name: 'Q1', revenue: 58440, target: 50000 },
          { name: 'Q2', revenue: 62760, target: 50000 },
          { name: 'Q3', revenue: 54720, target: 50000 },
          { name: 'Q4', revenue: 73440, target: 50000 }
        ]
      default:
        return []
    }
  }

  const data = getData()

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length >= 2) {
      const revenueData = payload.find(p => p.dataKey === 'revenue')
      const targetData = payload.find(p => p.dataKey === 'target')
      
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 font-poppins">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-green-600 font-poppins">
              Revenue: ${revenueData?.value?.toLocaleString() || '0'}
            </p>
            <p className="text-sm text-gray-500 font-poppins">
              Target: ${targetData?.value?.toLocaleString() || '0'}
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fontFamily: 'Poppins' }}
            stroke="#666"
          />
          <YAxis 
            tick={{ fontSize: 12, fontFamily: 'Poppins' }}
            stroke="#666"
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={3}
            fill="url(#revenueGradient)"
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
