'use client'
import { useState, useEffect } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = [
    "https://images.unsplash.com/opengraph/1x1.png?mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1662128400928-0e9a410caed7%3Fcrop%3Dfaces%252Cedges%26h%3D630%26w%3D1200%26blend%3D000000%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark-w%3D750%26mark-align%3Dmiddle%252Ccenter%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fw%253D750%2526h%253D84%2526txt%253Dbeach%252Bactivities%2526txt-pad%253D80%2526txt-align%253Dmiddle%25252Cleft%2526txt-color%253D%252523000000%2526txt-size%253D40%2526txt-width%253D660%2526txt-clip%253Dellipsis%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8NHx8YmVhY2glMjBhY3Rpdml0aWVzfGVufDB8fHx8MTczOTIwMzkyM3ww%26ixlib%3Drb-4.0.3&blend-w=1&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/opengraph/1x1.png?mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1621266460426-d142b81866e1%3Fcrop%3Dfaces%252Cedges%26h%3D630%26w%3D1200%26blend%3D000000%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark-w%3D750%26mark-align%3Dmiddle%252Ccenter%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fw%253D750%2526h%253D84%2526txt%253Dbeach%252Bgames%2526txt-pad%253D80%2526txt-align%253Dmiddle%25252Cleft%2526txt-color%253D%252523000000%2526txt-size%253D40%2526txt-width%253D660%2526txt-clip%253Dellipsis%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8M3x8YmVhY2glMjBnYW1lc3xlbnwwfHx8fDE3Mzg3MzA5NTV8MA%26ixlib%3Drb-4.0.3&blend-w=1&auto=format&fit=crop&q=60", 
    
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="mt-8 sm:mt-12 px-4 sm:px-6">
      <div className="rounded-2xl border border-slate-200 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-4">
          <div className="w-full lg:w-[45%]">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-orange-400 mb-4 sm:mb-6">
              Have queries? Connect with us
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cyan-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-cyan-300 px-3 py-1.5 text-cyan-900 placeholder-cyan-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400 transition-all duration-200 hover:border-orange-300"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cyan-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-cyan-300 px-3 py-1.5 text-cyan-900 placeholder-cyan-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400 transition-all duration-200 hover:border-orange-300"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-cyan-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-cyan-300 px-3 py-1.5 text-cyan-900 placeholder-cyan-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400 transition-all duration-200 hover:border-orange-300"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-cyan-700">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-cyan-300 px-3 py-1.5 text-cyan-900 placeholder-cyan-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400 transition-all duration-200 hover:border-orange-300"
                  placeholder="Your message"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-cyan-500 to-orange-400 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:from-cyan-400 hover:to-orange-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transform transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-[55%] h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
            <div className="relative w-full h-full transition-transform duration-1000 ease-in-out">
              <img
                src={`${images[currentImageIndex]}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`}
                alt="Modern architectural interior"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
