'use client'

import { useState, useCallback } from 'react'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

export interface FormField {
  value: string
  error: string | null
  touched: boolean
}

export interface FormValidation {
  [key: string]: ValidationRule
}

export function useFormValidation(initialValues: Record<string, string>, validationRules: FormValidation) {
  const [fields, setFields] = useState<Record<string, FormField>>(() => {
    const initialFields: Record<string, FormField> = {}
    Object.keys(initialValues).forEach(key => {
      initialFields[key] = {
        value: initialValues[key],
        error: null,
        touched: false
      }
    })
    return initialFields
  })

  const validateField = useCallback((name: string, value: string): string | null => {
    const rules = validationRules[name]
    if (!rules) return null

    if (rules.required && !value.trim()) {
      return 'This field is required'
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      if (name === 'email') return 'Please enter a valid email address'
      if (name === 'phone') return 'Please enter a valid phone number'
      return 'Invalid format'
    }

    if (rules.custom) {
      return rules.custom(value)
    }

    return null
  }, [validationRules])

  const setFieldValue = useCallback((name: string, value: string) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error: validateField(name, value),
        touched: true
      }
    }))
  }, [validateField])

  const setFieldTouched = useCallback((name: string) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validateField(name, prev[name].value)
      }
    }))
  }, [validateField])

  const validateAll = useCallback(() => {
    const newFields = { ...fields }
    let isValid = true

    Object.keys(newFields).forEach(name => {
      const error = validateField(name, newFields[name].value)
      newFields[name] = {
        ...newFields[name],
        error,
        touched: true
      }
      if (error) isValid = false
    })

    setFields(newFields)
    return isValid
  }, [fields, validateField])

  const reset = useCallback(() => {
    const resetFields: Record<string, FormField> = {}
    Object.keys(initialValues).forEach(key => {
      resetFields[key] = {
        value: initialValues[key],
        error: null,
        touched: false
      }
    })
    setFields(resetFields)
  }, [initialValues])

  const getFieldProps = useCallback((name: string) => ({
    value: fields[name]?.value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(name, e.target.value),
    onBlur: () => setFieldTouched(name),
    error: fields[name]?.touched ? fields[name]?.error : null
  }), [fields, setFieldValue, setFieldTouched])

  const isValid = Object.values(fields).every(field => !field.error)
  const hasErrors = Object.values(fields).some(field => field.error && field.touched)

  return {
    fields,
    setFieldValue,
    setFieldTouched,
    validateAll,
    reset,
    getFieldProps,
    isValid,
    hasErrors
  }
}
