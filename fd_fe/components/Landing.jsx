import React from "react"
import Accent from "../components/custom/Accent"
import ActiveLink from "../components/custom/ActiveLink"

const Landing = () => {
	const handleClick = (e) => {
		e.preventDefault()
		router.push(href)
	}
	return (
		<div className=''>
			<div className=' text-slate-200 px-5  hero-bg '>
				<div
					className='grid place-items-left place-content-center gap-1 h-screen
					mx-auto lg:max-w-4xl sm:max-w-xl'
				>
					<h1
						className=' text-3xl xs:text-2xl lg:text-5xl  font-bold mb-2
					 '
					>
						Welcome to
						<br />
						<span className='text-3xl sm:text-3xl lg:text-6xl '>
							<Accent>Omega Food Delivery </Accent>
						</span>
					</h1>
					<div className='lg:mt-5'>
						<p className='font-bold mb-1 lg:hidden text-md xs:text-md'>
							Writing code is my obsession as well as constant self-improvement, I
							have developed many web applications and platforms from scratch in my
							spare time (when I&apos;m not coding). Accustomed to using extensive
							tech stack because I love challenging and complex projects.
						</p>
						<p className='font-bold mb-1  hidden lg:block text-lg'>
							Writing code is my obsession as well as constant self-improvement, I
							have developed many web applications and platforms from scratch in my
							spare time (when I&apos;m not coding). Accustomed to using extensive
							tech stack because I love challenging and complex projects.
						</p>
					</div>

					<div className='mt-7  lg:mt-10  xl:grid-cols-2 sm:grid-cols-1 gap-2 text-sm sm:text-md xs:text-sm lg:text-md'>
						<ActiveLink
							href='/routes/food'
							name='food'
							className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-md  shadow-neutral-700
                  hover:cursor-pointer text-center text-white  border border-lime-500 hover:text-lime-600 hover:shadow-neutral-500
				 
				  '
						>
							Check Food Menu
						</ActiveLink>
						<ActiveLink
							href='/routes/login'
							className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-md  shadow-neutral-700
							hover:cursor-pointer text-center text-white  border border-lime-500 hover:text-lime-600 hover:shadow-neutral-500'
						>
							Login
						</ActiveLink>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing
