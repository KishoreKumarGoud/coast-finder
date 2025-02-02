'use client'

import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import Footer from '@/components/Footer'

export default function Contact() {
  const navItems = [
    {
      "link": "/",
      "label": "Home" 
    },
    {
      "link": "/about",
      "label": "About"
    }
  ]

  return (
    <>
      <Header navItems={navItems} />
      <main>
        <Container className="relative py-20">
          <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
            <h2 className="font-display text-4xl tracking-tight text-purple-600 sm:text-5xl md:text-6xl font-bold">
              Contact Us
            </h2>
            <p className="mt-6 text-2xl tracking-tight text-slate-700 font-semibold">
              Get in touch with us to transform your space into something extraordinary.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-12 bg-gradient-to-br from-blue-50 via-[#F5F5DC] to-[#D2B48C] shadow-lg transition-all duration-300 hover:shadow-xl text-center animate-[fadeIn_1s_ease-in]">
              <h3 className="font-display text-3xl font-bold text-slate-900">
                Location
              </h3>
              <p className="mt-4 text-xl text-slate-700">
              Rama Classic, Shilpi Valley Layout, Madhapur, Hyderabad<br />
                India
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-12 bg-gradient-to-br from-blue-50 via-[#F5F5DC] to-[#D2B48C] shadow-lg transition-all duration-300 hover:shadow-xl text-center animate-[fadeIn_1s_ease-in]">
              <h3 className="font-display text-3xl font-bold text-slate-900">
                Contact Details
              </h3>
              <div className="mt-4 space-y-4">
                <p className="text-xl text-slate-700">
                  <span className="font-semibold text-2xl">Email:</span><br />
                  info@hashtags.in
                </p>
                <p className="text-xl text-slate-700">
                  <span className="font-semibold text-2xl">Phone:</span><br />
                  +91- 7995191118
                </p>
                <p className="text-xl text-slate-700">
                  <span className="font-semibold text-2xl">Instagram:</span><br />
                  studio.traumhaus
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="rounded-2xl border border-slate-200 p-12 bg-gradient-to-br from-blue-50 via-[#F5F5DC] to-[#D2B48C] text-center animate-[fadeIn_1s_ease-in]">
              <h3 className="font-display text-3xl font-bold text-slate-900 mb-8">
                Our Location
              </h3>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995!3d19.08219865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689611696897!5m2!1sen!2sin"
                width="100%" 
                height="450" 
                style={{border: 0}}
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
