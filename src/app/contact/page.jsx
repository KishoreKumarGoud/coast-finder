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
              Have questions? We had love to hear from you.
            </p>
          </div>

          <div className="mt-16 max-w-xl mx-auto">
            <form className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-lg font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                  placeholder="Tell us what you need help with..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-3 px-6 text-lg font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
