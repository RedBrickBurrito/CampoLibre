import React, { ChangeEvent } from "react"

interface FormInputProps {
  label: string
  id: string
  type: string
  required?: boolean
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const FormInput: React.FC<FormInputProps> = ({ label, id, type, required, value, onChange, onBlur }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          className={
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          }
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  )
}

export default FormInput
