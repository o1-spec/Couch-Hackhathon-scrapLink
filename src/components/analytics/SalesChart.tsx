'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface SalesChartProps {
  timeRange: string
}

interface SalesData {
  name: string
  sales: number
  revenue: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
  }>
  label?: string
}

export function SalesChart({ timeRange }: SalesChartProps) {
  // Mock data based on time range
  const getData = (): SalesData[] => {
    switch (timeRange) {
      case '7d':
        return [
          { name: 'Mon', sales: 12, revenue: 1450 },
          { name: 'Tue', sales: 8, revenue: 980 },
          { name: 'Wed', sales: 15, revenue: 1890 },
          { name: 'Thu', sales: 6, revenue: 720 },
          { name: 'Fri', sales: 18, revenue: 2340 },
          { name: 'Sat', sales: 22, revenue: 2890 },
          { name: 'Sun', sales: 14, revenue: 1680 }
        ]
      case '30d':
        return [
          { name: 'Week 1', sales: 45, revenue: 5400 },
          { name: 'Week 2', sales: 52, revenue: 6240 },
          { name: 'Week 3', sales: 38, revenue: 4560 },
          { name: 'Week 4', sales: 61, revenue: 7320 }
        ]
      case '90d':
        return [
          { name: 'Month 1', sales: 156, revenue: 18720 },
          { name: 'Month 2', sales: 189, revenue: 22680 },
          { name: 'Month 3', sales: 142, revenue: 17040 }
        ]
      case '1y':
        return [
          { name: 'Q1', sales: 487, revenue: 58440 },
          { name: 'Q2', sales: 523, revenue: 62760 },
          { name: 'Q3', sales: 456, revenue: 54720 },
          { name: 'Q4', sales: 612, revenue: 73440 }
        ]
      default:
        return []
    }
  }

  const data = getData()

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length >= 2) {
      const salesData = payload.find(p => p.dataKey === 'sales')
      const revenueData = payload.find(p => p.dataKey === 'revenue')
      
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 font-poppins">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-blue-600 font-poppins">
              Sales: {salesData?.value || 0}
            </p>
            <p className="text-sm text-green-600 font-poppins">
              Revenue: ${revenueData?.value?.toLocaleString() || '0'}
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
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fontFamily: 'Poppins' }}
            stroke="#666"
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12, fontFamily: 'Poppins' }}
            stroke="#666"
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fontFamily: 'Poppins' }}
            stroke="#666"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontFamily: 'Poppins', fontSize: '12px' }}
          />
          <Bar 
            yAxisId="left"
            dataKey="sales" 
            fill="#3b82f6" 
            name="Sales"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            yAxisId="right"
            dataKey="revenue" 
            fill="#10b981" 
            name="Revenue ($)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
