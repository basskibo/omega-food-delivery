import React, { useState } from "react"
import Accent from "../../components/custom/Accent"
import axios from "axios"
import { useRouter } from "next/router"

import "react-loading-skeleton/dist/skeleton.css"
const Projects = () => {
	const router = useRouter()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorMsg, setErrorMsg] = useState(null)
	const [succMsg, setSuccMsg] = useState(null)

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
	}

	const handlePassChange = (event) => {
		setPassword(event.target.value)
	}
	const handleLoginClick = (event) => {
		event.preventDefault()

		setPassword(event.target.value)
		if (email && password) {
			login(email, password)
		}
	}

	function login(email, password) {
		return axios
			.post("http://localhost:3000/api/auth/login", { email, password })
			.then((response) => {
				debugger
				const { role, session, _id } = response.data
				localStorage.setItem("userId", JSON.stringify(response.data))
				localStorage.setItem("sessionid", session)
				localStorage.setItem("role", role)
				axios.defaults.headers.common["sessionid"] = session
				setErrorMsg(false)
				setSuccMsg("User logged in successfully.")
				setTimeout(() => {
					router.push("/routes/food", undefined, { shallow: true })
					return response.data
				}, 3000)
			})
			.catch((error) => {
				debugger
				console.error("Login error happened:", error)
				console.log(error.response)
				setErrorMsg(error.response.data)
			})
	}
	return (
		<div className='container h-screen mx-auto my-10 px-3 sm:px-2 xs:px-3 lg:px-5 bg-gradient-to-tr text-slate-400'>
			<div className='my-10'>
				<h1 className='mb-5'>
					<Accent className='font-extrabold text-6xl'>Login</Accent>
				</h1>
				<p className='display-4 '>In order to be able to order food please login</p>
			</div>
			<div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-8 '>
				<input
					placeholder='email'
					value={email}
					onChange={handleEmailChange}
					className='bg-neutral-900 border-lime-500 border p-4'
				></input>
				<input
					placeholder='password'
					type='password'
					value={password}
					onChange={handlePassChange}
					className='bg-neutral-900 border-lime-500 border p-4'
				></input>
				<button onClick={handleLoginClick}>
					<a className='inline-flex  hover:text-gray-400 hover:cursor-pointer text-slate-400 hover:text-semibold'>
						<span
							className='h-12 p-3 flex 
                         mt-3 justify-center uppercase font-semibold px-5 border border-lime-500'
						>
							Submit
						</span>
					</a>
				</button>
			</div>
			<span>
				{errorMsg ? (
					<div className='mt-5 text-red-500 font-xl'>
						{" "}
						<p>{errorMsg}</p>{" "}
					</div>
				) : (
					""
				)}
			</span>
			<span>
				{succMsg ? (
					<div className='mt-5  '>
						{" "}
						<p className='text-bold font-2xl text-green-500'>{succMsg}</p>{" "}
					</div>
				) : (
					""
				)}
			</span>
		</div>
		// </div>
	)
}
export default Projects
