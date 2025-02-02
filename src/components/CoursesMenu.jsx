// Import required Headless UI Menu components
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// Import icons from Heroicons
import {
    ArrowRightCircleIcon,
    ChevronDownIcon,
} from '@heroicons/react/20/solid'

// Dropdown menu component for displaying different course/work categories
export default function CoursesMenu() {
    return (
        // Menu container with relative positioning
        <Menu as="div" className="relative inline-block text-left">
            {/* Group wrapper for hover effects */}
            <div className="group">
                {/* Menu trigger button with hover animations */}
                <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-full bg-[#FFFDD0] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#F5F5DC] hover:scale-110 outline-none transition-all duration-200 ease-out">
                    Our Works
                    {/* Dropdown chevron icon */}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>

                {/* Dropdown menu panel with backdrop blur effect */}
                <MenuItems
                    static
                    className="invisible group-hover:visible absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-xl bg-white shadow-xl transition focus:outline-none"
                >
                    <div className="py-2">
                        {/* Interior Design menu item */}
                        <MenuItem>
                            <a
                                href="#"
                                className="group flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200 rounded-lg mx-2"
                            >
                                <ArrowRightCircleIcon
                                    aria-hidden="true"
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"
                                />
                                Interior Design
                            </a>
                        </MenuItem>
                        {/* Architecture menu item */}
                        <MenuItem>
                            <a
                                href="#"
                                className="group flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200 rounded-lg mx-2"
                            >
                                <ArrowRightCircleIcon
                                    aria-hidden="true"
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"
                                />
                                Architecture
                            </a>
                        </MenuItem>
                        {/* Urban Planning menu item */}
                        <MenuItem>
                            <a
                                href="#"
                                className="group flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200 rounded-lg mx-2"
                            >
                                <ArrowRightCircleIcon
                                    aria-hidden="true"
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"
                                />
                                Urban Planning
                            </a>
                        </MenuItem>
                        {/* Landscape Design menu item */}
                        <MenuItem>
                            <a
                                href="#"
                                className="group flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200 rounded-lg mx-2"
                            >
                                <ArrowRightCircleIcon
                                    aria-hidden="true"
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"
                                />
                                Landscape Design
                            </a>
                        </MenuItem>
                        {/* Commercial Spaces menu item */}
                        <MenuItem>
                            <a
                                href="#"
                                className="group flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200 rounded-lg mx-2"
                            >
                                <ArrowRightCircleIcon
                                    aria-hidden="true"
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"
                                />
                                Commercial Spaces
                            </a>
                        </MenuItem>
                    </div>
                </MenuItems>
            </div>
        </Menu>
    )
}
