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
import CoursesMenu from './CoursesMenu'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function MobileNavLink({ href, children }) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2 text-gray-800">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-gray-800"
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

function MobileNavigation({navItems}) {
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
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-gray-50 p-4 text-lg tracking-tight text-gray-800 shadow-xl ring-1 ring-slate-900/5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="relative">
          <Menu as="div" className="w-full">
            <MenuButton className="block w-full p-2 text-left text-gray-800">
              Our Works
              <ChevronDownIcon className="inline-block ml-2 h-5 w-5 text-gray-400" />
            </MenuButton>
            <MenuItems className="absolute left-0 right-0 mt-1 w-full origin-top-right rounded-xl bg-white shadow-lg">
              <div className="py-2">
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Interior Design
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Architecture
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Urban Planning
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Commercial Spaces
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Residential Spaces
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        {navItems.map((item) => {
          return <NavLink href={item.link} key={item.label}>
            {item.label}</NavLink>
        })}
      </PopoverPanel>
    </Popover>
  )
}

export function Header({ navItems }) {
  return (
    <header className="py-3 bg-gray-50 rounded-lg">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto text-gray-800" />
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:flex md:gap-x-6 md:items-center text-gray-800">
              <CoursesMenu />
              {navItems.map((item) => {
                return <NavLink href={item.link} key={item.label}>
                  {item.label}</NavLink>
              })}
            </div>
            <div className="-mr-1 md:hidden">
              <MobileNavigation navItems={navItems}/>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
