import Footer from '@/components/Footer'
import { Gallery } from '@/components/gallery'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <PrimaryFeatures />
                <Gallery />
            </main>
            <Footer />
        </>
    )
}
