'use client'

import Link from 'next/link'
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

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function MobileNavLink({ href, children }) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2 text-blue-800">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-blue-800"
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

function MobileNavigation({ navItems }) {
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
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-blue-50 p-4 text-lg tracking-tight text-blue-800 shadow-xl ring-1 ring-slate-900/5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="relative">
          <Menu as="div" className="w-full">
            <MenuButton className="block w-full p-2 text-left text-blue-800">
              Beach Activities
              <ChevronDownIcon className="inline-block ml-2 h-5 w-5 text-blue-400" />
            </MenuButton>
            <MenuItems className="absolute left-0 right-0 mt-1 w-full origin-top-right rounded-xl bg-white shadow-lg">
              <div className="py-2">
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                    Surfing
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                    Snorkeling
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                    Beach Yoga
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                    Beach Volleyball
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                    Sunset Cruises
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        {navItems?.map((item) => (
  <NavLink href={item.link} key={item.label}>{item.label}</NavLink>
))}

        <NavLink href="/login" className="mt-4 block w-full text-center bg-blue-600 text-white rounded-lg py-2">Login</NavLink>
      </PopoverPanel>
    </Popover>
  )
}

export function Header({ navItems }) {
  return (
    <header className="py-3 bg-blue-50 rounded-lg">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center">
            <Link href="/" aria-label="Home">
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Coast Finder</span>
                <span className="text-sm text-cyan-600 font-medium tracking-wide">Discover Your Perfect Beach Getaway</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:flex md:gap-x-6 md:items-center text-blue-800">
            {navItems?.map((item) => (
  <NavLink href={item.link} key={item.label}>{item.label}</NavLink>
))}

              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</Link>
            </div>
            <div className="-mr-1 md:hidden">
              <MobileNavigation navItems={navItems} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
