import { useState } from 'react'
import { Container } from '@/components/Container'
import { Link } from 'react-router-dom'
import { MapPin, Star, ArrowRight, Sparkles, Mail, Phone, Send } from 'lucide-react'

const galleryItems = [
  {
    title: 'Goa',
    state: 'goa',
    rating: 4.8,
    category: 'Best for nightlife, parties, water sports, and luxury stays.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
  },
  {
    title: 'Kerala',
    state: 'kerala',
    rating: 4.7,
    category: 'Best for backwaters, ayurveda, yoga, and cliffside beaches',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600',
  },
  {
    title: 'Andaman Islands',
    state: 'andamanislands',
    rating: 4.9,
    category: 'Best for pristine beaches, snorkeling, and scuba diving',
    image: 'https://images.unsplash.com/photo-1586861256632-6c2b0e2b2b5a?w=600',
  },
  {
    title: 'Tamil Nadu',
    state: 'tamilnadu',
    rating: 4.5,
    category: 'Best for heritage sites, photography, and spiritual vibes.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600',
  },
  {
    title: 'Karnataka',
    state: 'karnataka',
    rating: 4.6,
    category: 'Best for offbeat travel, budget trips, and scenic landscapes',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
  },
  {
    title: 'Gujarat',
    state: 'gujarat',
    rating: 4.4,
    category: 'Best for spiritual beaches and heritage coastal towns',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600',
  }
]

export function Gallery() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <>
      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-b from-white to-orange-50">
        <Container>
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Popular Destinations
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              Most Celebrated Spots
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover India's most loved beach destinations handpicked for unforgettable experiences
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <Link
                key={index}
                to={`/beaches/${item.state}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <span className="text-white/90 text-sm font-medium">{item.rating}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {item.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-white/70 text-sm mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>India</span>
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-sm line-clamp-2 mb-4">
                      {item.category}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-orange-400 font-medium group/btn">
                      <span className="text-sm">Explore</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Hover Ring Effect */}
                <div className="absolute inset-0 ring-2 ring-orange-400 ring-opacity-0 group-hover:ring-opacity-100 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-green-50 via-white to-orange-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
                <Mail className="w-4 h-4" />
                Get in Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-lg text-gray-600">
                Have questions about planning your beach trip? We're here to help!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-white/80 mb-8">
                  Whether you need help finding the perfect beach or have feedback about our platform, we'd love to hear from you.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Email</p>
                      <p className="font-medium">hello@coastfinder.in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Phone</p>
                      <p className="font-medium">+91 98765 43210</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm text-white/70">Office Hours</p>
                  <p className="font-medium">Mon - Sat: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
