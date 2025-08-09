'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface PerformanceData {
  name: string
  value: number
  color: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    payload: PerformanceData
  }>
}

interface CustomLabelProps {
  cx?: number
  cy?: number
  midAngle?: number
  innerRadius?: number
  outerRadius?: number
  percent?: number
}

interface LegendEntry {
  color?: string
  value?: string
}

const data: PerformanceData[] = [
  { name: 'Metals', value: 35, color: '#3b82f6' },
  { name: 'Construction', value: 28, color: '#10b981' },
  { name: 'Electronics', value: 20, color: '#f59e0b' },
  { name: 'Recyclables', value: 12, color: '#ef4444' },
  { name: 'Other', value: 5, color: '#8b5cf6' }
]

export function ListingPerformanceChart() {
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 font-poppins">{data?.name}</p>
          <p className="text-sm text-gray-600 font-poppins mt-1">
            {data?.value}% of total sales
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomLabelProps) => {
    if (
      cx === undefined || 
      cy === undefined || 
      midAngle === undefined || 
      innerRadius === undefined || 
      outerRadius === undefined || 
      percent === undefined
    ) {
      return null
    }

    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontFamily="Poppins"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontFamily: 'Poppins', fontSize: '12px' }}
            formatter={(value: string, entry: LegendEntry) => (
              <span style={{ color: entry.color || '#000' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
