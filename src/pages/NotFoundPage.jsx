import { Link } from 'react-router-dom'
import { Button } from '@/components/Button'

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center">
                <Link to="/" aria-label="Home">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Coast Finder</span>
                </Link>
            </div>
            <p className="mt-20 text-sm font-medium text-gray-700">404</p>
            <h1 className="mt-3 text-lg font-semibold text-gray-900">
                Page not found
            </h1>
            <p className="mt-3 text-sm text-gray-700">
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <Button href="/" className="mt-10">
                Go back home
            </Button>
        </div>
    )
}
