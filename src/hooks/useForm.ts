import { useState } from 'react'

export const useForm = <T extends Object>(initialState: T) => {
  const [form, setForm] = useState(initialState)

  const handleInputChange = <K extends Object>(value: K, field: keyof T) => {
    setForm({
      ...form,
      [field]: value
    })
  }

  const resetForm = () => {
    setForm(initialState)
  }

  return {
    ...form,
    form,
    handleInputChange,
    resetForm
  }
}
