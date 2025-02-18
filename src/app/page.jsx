import ContactForm from '@/components/contactForm'
import Footer from '@/components/Footer'
import { Gallery } from '@/components/gallery'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'

export default function Home() {
  const navItems = [
   
    {
      "link": "/about",
      "label": "About"
    },
    {
      "link": "/contact",
      "label": "Contact us"
    }
  ]
  return (
    <>
      <Header navItems={navItems} />
      <main>
        <Hero />
        <PrimaryFeatures />
        <Gallery />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
