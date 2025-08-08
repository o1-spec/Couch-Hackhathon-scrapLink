'use client'

import { Input } from './input'
import { Label } from './label'
import { cn } from '@/lib/utils'

interface FormInputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  error?: string | null
  required?: boolean
  icon?: React.ReactNode
  className?: string
}

export function FormInput({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
  icon,
  className
}: FormInputProps) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="font-poppins">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative mt-1">
        {icon && (
          <div className="absolute left-3 top-3 text-gray-400">
            {icon}
          </div>
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            'font-poppins',
            icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-1 font-poppins">{error}</p>
      )}
    </div>
  )
}
