import { Link } from 'react-router-dom'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-800"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight shadow-xl ring-1 ring-slate-900/5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="relative">
          <Menu as="div" className="w-full">
            <MenuButton className="block w-full p-2 text-left text-slate-800 font-medium">
              Beach Activities
              <ChevronDownIcon className="inline-block ml-2 h-5 w-5 text-slate-400" />
            </MenuButton>
            <MenuItems className="absolute left-0 right-0 mt-1 w-full origin-top-right rounded-xl bg-white shadow-lg border border-gray-100">
              <div className="py-2">
                <MenuItem>
                  <a href="#map-selection" className="block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700">
                    Surfing
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#map-selection" className="block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700">
                    Snorkeling
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#map-selection" className="block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700">
                    Beach Yoga
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#map-selection" className="block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700">
                    Sunset Cruises
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        <a href="#gallery" className="block w-full p-2 text-slate-800 hover:text-orange-600">
          Destinations
        </a>
        <a href="#contact" className="block w-full p-2 text-slate-800 hover:text-orange-600">
          Contact
        </a>
        <Link to="/login" className="mt-4 block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg py-2 font-medium">
          Login
        </Link>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  return (
    <header className="py-3 bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40">
      <Container>
        <nav className="relative z-50 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" aria-label="Home">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 via-white to-green-600 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #102274ff 33%, #1919bdff 70%, #142112ff 67%, #138808 100%)' }}>
                  Coast Finder
                </span>
                <span className="text-xs sm:text-sm text-slate-600 font-medium tracking-wide">
                  Discover India's Best Beaches
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-x-4 md:gap-x-6">
            <div className="hidden md:flex md:gap-x-6 md:items-center text-slate-700">
              <a href="#map-selection" className="hover:text-orange-600 font-medium transition-colors">
                Explore
              </a>
              <a href="#gallery" className="hover:text-orange-600 font-medium transition-colors">
                Destinations
              </a>
              <a href="#contact" className="hover:text-orange-600 font-medium transition-colors">
                Contact
              </a>
              <Link
                to="/login"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Login
              </Link>
            </div>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
