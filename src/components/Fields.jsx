// Import required dependencies
import { useId } from 'react'
import clsx from 'clsx'

// Common form input styling classes
const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm'

// Label component for form fields
function Label({ id, children }) {
  return (
    <label
      htmlFor={id}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  )
}

// Text input field component
// Accepts label, type (defaults to text), className and other props
export function TextField({ label, type = 'text', className, ...props }) {
  let id = useId() // Generate unique ID for input-label association

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  )
}

// Select dropdown field component
// Accepts label, className and other props
export function SelectField({ label, className, ...props }) {
  let id = useId() // Generate unique ID for input-label association

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  )
}
