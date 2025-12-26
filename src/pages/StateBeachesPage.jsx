import { useParams, Navigate, Link } from 'react-router-dom'
import { beachStates } from '@/data/beachStates'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import Footer from '@/components/Footer'
import { MapPin, Star, ArrowRight, Waves, Sun, Palmtree } from 'lucide-react'

export default function StateBeachesPage() {
    const { state } = useParams()

    const stateData = beachStates.find(
        (s) => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase()
    )

    if (!stateData) return <Navigate to="/not-found" replace />

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 py-16">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <Container className="relative z-10">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Waves className="w-10 h-10 text-white/90" />
                            <Sun className="w-8 h-8 text-yellow-300" />
                            <Palmtree className="w-10 h-10 text-white/90" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-white mb-4 drop-shadow-lg">
                            {stateData.name} Beaches
                        </h1>
                        <p className="text-center text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
                            {stateData.description}
                        </p>
                        <div className="flex justify-center gap-2 mt-6 flex-wrap">
                            {stateData.highlights.map((highlight, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                                >
                                    {highlight}
                                </span>
                            ))}
                        </div>
                    </Container>
                </div>

                {/* Beach Cards Section */}
                <Container className="py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {stateData.beaches.map((beach, index) => (
                            <Link
                                key={index}
                                to={`/beaches/${state}/${beach.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:ring-2 hover:ring-cyan-400 h-full flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={beach.image}
                                            alt={beach.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Rating Badge */}
                                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-semibold text-gray-800">4.5</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors">
                                            {beach.name}
                                        </h2>

                                        {/* Location */}
                                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                                            <MapPin className="w-4 h-4" />
                                            <span>{stateData.name}, India</span>
                                        </div>

                                        {/* Review */}
                                        <p className="text-gray-600 text-sm line-clamp-2 flex-grow">
                                            {beach.Review || beach.description?.substring(0, 100)}
                                        </p>

                                        {/* CTA Button */}
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <span className="text-cyan-600 font-semibold text-sm group-hover:text-cyan-700">
                                                    Explore Beach
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                                                    <ArrowRight className="w-4 h-4 text-cyan-600 group-hover:text-white transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {stateData.beaches.length === 0 && (
                        <div className="text-center py-20">
                            <Waves className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600">No beaches found</h3>
                            <p className="text-gray-500">Check back later for updates!</p>
                        </div>
                    )}
                </Container>
            </main>
            <Footer />
        </>
    )
}
