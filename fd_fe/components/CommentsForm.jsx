import React, { useState, useRef, useEffect } from "react"
import { Switch } from "@headlessui/react"
import axios from "axios"

const CommentsForm = ({ _id }) => {
	const [error, setError] = useState(false)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
	const [checked, setEnabled] = useState(false)
	const commentEl = useRef()
	const storeDataEl = useRef()

	const handleCommentSubmition = async () => {
		console.log("Handling button click!!")
		setError(false)
		setShowSuccessMessage(false)
		const { value: comment } = commentEl.current

		if (!comment) {
			setError(true)

			return
		}

		const data = { text: comment, foodId: _id }
		const sessionid = window.localStorage.getItem("sessionid")
		debugger
		let config = {
			headers: {
				sessionid: sessionid,
			},
		}
		await axios.post("http://localhost:3000/api/comment", data, config)
		setShowSuccessMessage(true)
		commentEl.current.value = ""

		setTimeout(() => {
			setShowSuccessMessage(false)
		}, 10000)
	}
	return (
		<div className='bg-neutral-900 shadow-lg rounded-lg  pb-12 mb-8'>
			<br />
			<h3 className='text-xl mb-8 text-white font-semibold border-b pb-4'>
				Leave you comment
			</h3>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<textarea
					ref={commentEl}
					className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-slate-700'
					placeholder='Comment'
					name='comment'
				></textarea>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-2  mb-4 ml-1'>
				<div>
					<Switch
						checked={checked}
						onChange={setEnabled}
						ref={storeDataEl}
						className={`${
							checked ? "bg-gray-400" : "bg-slate-400"
						} relative inline-flex items-center h-4 rounded-full w-11`}
					>
						<span className='sr-only'>Enable notifications</span>
						<span
							className={`${
								checked ? "translate-x-6" : "translate-x-1"
							} inline-block w-3 h-3  bg-white rounded-full`}
						/>
					</Switch>
					<label className='text-white pl-2 text-sm w-full' htmlFor='storeData'>
						Remember my name and email for next time I comment
					</label>
				</div>
			</div>
			{error && <p className='text-lg text-red-500'>*All fields are required</p>}
			{showSuccessMessage && (
				<p className='text-lg text-green-500'>
					Your comment was successfully submitted , please wait while admin approves
					it.
				</p>
			)}
			<div className='mt-8'>
				<button onClick={handleCommentSubmition}>
					<a className='inline-flex  hover:text-gray-400 hover:cursor-pointer text-slate-400 hover:text-semibold'>
						<span className='h-10 flex items-center mt-3 justify-center uppercase font-semibold px-5 border border-lime-500'>
							Submit
						</span>
					</a>
				</button>
			</div>
		</div>
	)
}

export default CommentsForm
