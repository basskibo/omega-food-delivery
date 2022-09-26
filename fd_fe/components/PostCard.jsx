import React from "react"
import moment from "moment"
import Accent from "./custom/Accent"
import Image from "next/image"
import constants from "../lib/constants"
import Rating from "../components/Rating"

const PostCard = ({ food }) => {
	return (
		<div
			key={food.name}
			className='w-full  text-white rounded-md border border-gray-600 dark:bg-dark dark:border-gray-600 transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97] hover:cursor-pointer transition duration-100 animate-shadow'
		>
			<a href={`/food/${food._id}`}>
				<div className='relative overflow-hidden  h-72'>
					<Image
						alt={food.picture}
						src={food.picture}
						blurDataURL={constants.imageBlogURI}
						placeholder='blur'
						layout='fill'
					/>
					<div className='absolute w-full py-2 bottom-0 inset-x-0  text-white text-s text-center leading-4'></div>
				</div>

				<div className='px-3 my-3 '>
					<h1 className='text-xl font-bold'> {food.name}</h1>
					<div className='mt-3 text-slate-400 '>
						{" "}
						<div className='align-middle my-5'>
							<Rating />
						</div>
						<p className='align-middle  text-slate-400 mt-1'>
							Available from {moment(food.createdAt).format("MMMM DD, YYYY")}
						</p>
						<p className='mt-1 text-slate-400 text-xl '>
							Price <Accent className='font-bold'>${food.price}</Accent>
						</p>
					</div>
				</div>
			</a>
		</div>
	)
}

export default PostCard
