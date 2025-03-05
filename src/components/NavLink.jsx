// Import Link component from Next.js
import Link from 'next/link'

// NavLink component that wraps Next.js Link with custom styling
export function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}
