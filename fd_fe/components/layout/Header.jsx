import React, { useContext, useEffect, Fragment, useState } from "react"
import Link from "next/link"
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react"
import { BellIcon, MenuIcon, XIcon, LoginIcon } from "@heroicons/react/outline"
import ActiveLink from "../custom/ActiveLink"
import { useRouter } from "next/router"

const navigation = [
	{ name: "Home", href: "/", current: true },
	{ name: "Food", href: "/routes/food", current: true },
]

const Header = ({ href }) => {
	const router = useRouter()

	const handleClick = (e) => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<div className='sticky top-0 z-50 absolute bg-neutral-800'>
			<Disclosure
				as='nav'
				className=' border-b border-slate-400 lg:pb-1 text-white  lg:pt-1'
			>
				{({ open }) => (
					<>
						<div className=' max-w-10xl mx-auto px-2 sm:px-6 lg:px-8'>
							<div className='relative flex items-center justify-between h-16'>
								<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
									<div className='flex-shrink-0 flex items-center'>
										<a href='/'>
											<img
												className='block lg:hidden h-8 w-auto'
												src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
												alt='Workflow'
											/>
											<img
												className='hidden lg:block h-8 w-auto'
												src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
												alt='Workflow'
											/>
										</a>
									</div>
									<div className='hidden sm:block sm:ml-6'>
										<div className='flex space-x-4'>
											{/* <DisclocureButton /> */}
											{navigation.map((item) => (
												<ActiveLink key={item.name} href={item.href}>
													{item.name}
												</ActiveLink>
											))}
										</div>
									</div>
								</div>
								<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 xs:hidden'>
									<div className='text-center hidden lg:inline'>
										<Link href={`/routes/login`}>
											<a className='inline-flex'>
												<span className='h-9 mb-3 flex items-center mt-3 justify-center  font-semibold px-5 border-2 border-lime-800 text-slate-400 hover:bg-neutral-700 hover:text-white hover:cursor-pointer transition duration-500 ease-in-out'>
													Login
													<span className='ml-2'>
														<svg
															className='w-6 h-6'
															fill='none'
															stroke='currentColor'
															viewBox='0 0 24 24'
															xmlns='http://www.w3.org/2000/svg'
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth='2'
																d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
															></path>
														</svg>
													</span>
												</span>
											</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</Disclosure>
		</div>
	)
}

export default Header
