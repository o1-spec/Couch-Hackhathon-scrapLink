'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface GeographicData {
  name: string
  sales: number
  revenue: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    payload: GeographicData
  }>
  label?: string
}

const data: GeographicData[] = [
  { name: 'Illinois', sales: 45, revenue: 5400 },
  { name: 'Michigan', sales: 32, revenue: 3840 },
  { name: 'Wisconsin', sales: 28, revenue: 3360 },
  { name: 'Indiana', sales: 22, revenue: 2640 },
  { name: 'Ohio', sales: 18, revenue: 2160 }
]

export function GeographicChart() {
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 font-poppins">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-blue-600 font-poppins">
              Sales: {payload[0]?.value}
            </p>
            <p className="text-sm text-green-600 font-poppins">
              Revenue: ${data?.revenue.toLocaleString()}
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
        <BarChart 
          data={data} 
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            type="number"
            tick={{ fontSize: 12, fontFamily: 'Poppins' }}
            stroke="#666"
          />
          <YAxis 
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fontFamily: 'Poppins' }}
            stroke="#666"
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="sales" 
            fill="#3b82f6"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
