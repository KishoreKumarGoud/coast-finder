'use client'
import Footer from '@/components/Footer'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'

const navItems = [
  {
    "link": "/",
    "label": "Home"
  },
  {
    "link": "/contact", 
    "label": "Contact"
  }
]

export default function About() {
  return (
    <>
      <Header navItems={navItems} />
      <main>
        <Container className="relative py-20">
          <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
            <h2 className="font-display text-4xl tracking-tight text-purple-600 sm:text-5xl md:text-6xl font-bold">
              About Coast-Finder
            </h2>
            <p className="mt-6 text-2xl tracking-tight text-slate-700 font-semibold">
              Your Ultimate Guide to Indias Beautiful Beaches
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8">
            <div className="rounded-2xl border border-slate-200 p-12 bg-gradient-to-br from-blue-50 via-[#F5F5DC] to-[#D2B48C] shadow-lg">
              <h3 className="font-display text-3xl font-bold text-slate-900 mb-6">
                Our Mission
              </h3>
              <p className="text-xl text-slate-700 leading-relaxed">
                Coast-Finder is dedicated to helping travelers discover the perfect beach destinations across India. 
                From the pristine shores of the Andamans to the vibrant beaches of Goa, we provide comprehensive 
                guides and information to make your beach exploration seamless and memorable.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-12 bg-gradient-to-br from-blue-50 via-[#F5F5DC] to-[#D2B48C] shadow-lg">
              <h3 className="font-display text-3xl font-bold text-slate-900 mb-6">
                What We Offer
              </h3>
              <ul className="space-y-4 text-xl text-slate-700">
                <li>• Detailed guides to Indias coastal states</li>
                <li>• Curated beach recommendations</li>
                <li>• Local insights and travel tips</li>
                <li>• Regional beach activity suggestions</li>
                <li>• Cultural and historical context</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 p-12 bg-gradient-to-br from-blue-50 via-[#F5F5DC] to-[#D2B48C] shadow-lg">
              <h3 className="font-display text-3xl font-bold text-slate-900 mb-6">
                Our Vision
              </h3>
              <p className="text-xl text-slate-700 leading-relaxed">
                We envision becoming the most trusted resource for beach tourism in India, promoting responsible 
                travel while showcasing the incredible diversity of Indias coastline. Our platform aims to 
                connect travelers with the perfect coastal destinations while promoting sustainable tourism 
                practices.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
