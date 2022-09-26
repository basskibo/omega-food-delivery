import React, { useState } from "react"
import axios from "axios"
import Image from "next/image"
import moment from "moment"
import constants from "../../lib/constants"
import Accent from "../../components/custom/Accent"
import Comments from "../../components/Comments"
import CommentsForm from "../../components/CommentsForm"

const PostDetails = ({ food, comments }) => {
	const [orderPlaced, setorderPlaced] = useState(false)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
	const [showErrorMessage, setShowErrorMessage] = useState(false)

	const handleOrderClick = async () => {
		let config = {
			headers: {
				sessionid: window.localStorage.getItem("sessionid"),
			},
		}
		const data = { foodId: food._id }
		let error
		try {
			await axios
				.post("http://localhost:3000/api/order", data, config)
				.catch((err) => {
					debugger
					if (err.response.status === 404) {
						throw new Error(`${err.config.url} not found`)
					}
					setShowSuccessMessage(false)
					setShowErrorMessage(err.response.data)
					throw err
				})
			setShowErrorMessage(false)
			setShowSuccessMessage(true)
		} catch (err) {
			error = err
		}
	}

	return (
		<div className='container mx-auto  lg:rounded-lg lg:p-0 lg:mt-5 sm:mt-10 xs:mt-10'>
			<div className='flex justify-center mb-8 w-full pt-5 lg:pt-1 mt-0 lg:mt-0'>
				<h1 className='lg:text-4xl text-xl lg:my-5 text-semibold text-white font-bold'>
					{food.name}
				</h1>
			</div>
			<div className='relative  md-6 h-96  '>
				<Image
					src={food.picture}
					alt={food.picture}
					blurDataURL={constants.imageBlogURI}
					placeholder='blur'
					layout='fill'
					priority
					className=' object-cover h-full w-full rounded-lg'
				/>
			</div>
			<div className='lg:px-0 my-2'>
				<div className=' text-slate-400 mb-6 my-6 w-full'>
					<div className='flex-1  mb-2 w-full lg:w-auto mr-8'>
						<p className='text-slate-400 ml-2 lg:text-lg sm:text-sm'>
							Writen on{" "}
							<span className='font-semibold '>
								{moment(food.createdAt).format("MMMM DD, YYYY")}
							</span>{" "}
						</p>
					</div>
				</div>
			</div>
			<div className='lg:px-0 my-2'>
				<div className=' text-slate-400 mb-6 my-6 w-full'>
					<div className='flex-1  mb-2 w-full lg:w-auto mr-8'>
						<p className='text-slate-400 ml-2 lg:text-lg '>{food.description}</p>
					</div>
				</div>
			</div>
			<div className='lg:px-0 my-2'>
				<div className=' text-slate-400 mb-6 my-6 w-full'>
					<div className='flex-1  mb-2 w-full lg:w-auto mr-8'>
						<p className='text-slate-400 ml-2 text-xl '>
							Price: <Accent className='font-bold'>${food.price}</Accent>
						</p>
					</div>
					<div className='flex-1  mb-2 w-full lg:w-auto mr-8 '>
						<button
							className='border-lime-500 border p-2 font-bold bhover:bg-neutral-700 hover:text-lime-400 hover:cursor-pointer text-slate-400 hover:text-semibold ml-2'
							onClick={handleOrderClick}
						>
							Place order
						</button>
						{showSuccessMessage && (
							<p className='text-2lg font-bold text-green-500 mt-5 '>
								Your order was successfully submitted , it will be delivered from
								nearest available address in 15 minutes.
							</p>
						)}
						{showErrorMessage && (
							<p className='text-2lg font-bold text-red-500 mt-5 '>
								{showErrorMessage}
							</p>
						)}
					</div>
				</div>
			</div>
			<div className='px-3 my-3 '>
				<div className=' flex gap-x-4'>
					<CommentsForm className='' _id={food._id} />
					<Comments className='' _id={food._id} comments={comments} />
				</div>
			</div>
		</div>
	)
}

export default PostDetails

export const getStaticProps = async ({ params: { _id } }) => {
	const url = `http://localhost:3000/api/food/${_id}`
	const { data } = await axios.get(url)
	const food = data
	const commUrl = `http://localhost:3000/api/comment/${_id}`
	const rsp = await axios.get(commUrl, { params: { limit: 3 } })
	const comments = rsp.data
	return {
		props: {
			food,
			comments,
		},
	}
}
export const getStaticPaths = async () => {
	const { data } = await axios.get("http://localhost:3000/api/food")
	const foodList = data.foodList
	const paths = foodList.map((food) => ({
		params: {
			_id: food._id,
		},
	}))
	console.log(paths)
	return {
		paths,
		fallback: false,
	}
}
