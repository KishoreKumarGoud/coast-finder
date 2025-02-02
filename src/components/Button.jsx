// Import Next.js Link component for navigation
import Link from 'next/link'
// Import clsx utility for conditional className joining
import clsx from 'clsx'

// Define base styles for button variants
const baseStyles = {
  // Styles for solid button variant
  solid:
    'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  // Styles for outline button variant  
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none',
}

// Define styles for different color variants
const variantStyles = {
  // Styles for solid button colors
  solid: {
    // Slate colored solid button
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    // Blue colored solid button  
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    // White colored solid button
    white:
      'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white',
    // Creamy white colored solid button for header
    cream:
      'bg-[#FFFAF0] text-slate-900 hover:bg-[#FFF5E6] active:bg-[#FFF0DB] active:text-slate-600 focus-visible:outline-[#FFFAF0]',
  },
  // Styles for outline button colors
  outline: {
    // Slate colored outline button
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300',
    // White colored outline button  
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
  },
}

// Button component that handles both button and link rendering
export function Button({ className, ...props }) {
  // Set default variant to solid if not provided
  props.variant ??= 'solid'
  // Set default color to slate if not provided
  props.color ??= 'slate'

  // Combine classes based on variant and color
  className = clsx(
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : undefined,
    className,
  )

  // Render either a button or Link component based on presence of href prop
  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
