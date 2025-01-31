import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArrowRightCircleIcon,
    ChevronDownIcon,
} from '@heroicons/react/20/solid'

export default function CoursesMenu() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div className="group">
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 hover:text-blue-600 outline-none transition duration-200">
                    Our Works
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                    static
                    className="invisible group-hover:visible absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-xl bg-white/90 backdrop-blur-sm shadow-xl transition focus:outline-none"
                >
                    <div className="py-2">
                        <MenuItem>
                            <a
                                href="#"
                                className="group flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                            >
                                <ArrowRightCircleIcon
                                    aria-hidden="true"
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"
                                />
                                Interior Design
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="group flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                            >
                                <ArrowRightCircleIcon
                                    aria-hidden="true"
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"
                                />
                                Architecture
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="group flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                            >
                                <ArrowRightCircleIcon
                                    aria-hidden="true"
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"
                                />
                                Urban Planning
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="group flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                            >
                                <ArrowRightCircleIcon
                                    aria-hidden="true"
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"
                                />
                                Landscape Design
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="group flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
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
