import React, { useState, useEffect } from "react"
import moment from "moment"

const Comment = ({ comments }) => {
	const [comms, setComments] = useState(comments)

	return (
		<div>
			{" "}
			{comms.length > 0 && (
				<div className='bg-neutral-900  shadow-lg rounded-lg p-8 pb-4 mb-8'>
					<h3 className='text-xl mb-8 text-white font-semibold border-b pb-4'>
						{comments.length} Comments
					</h3>
					<div class='flex justify-center'>
						<div class='mb-3 xl:w-96'>
							<select
								class='form-select appearance-none
									block
									w-full
									px-3
									py-1.5
									text-base
									font-normal
									text-gray-700
									bg-neutral-900 bg-clip-padding bg-no-repeat
									border border-solid border-lime-400
									rounded
									transition
									ease-in-out
									m-0
									focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								aria-label='Default select example'
							>
								<label disabled>Number of comments to display</label>
								<option value='1' selected>
									One
								</option>
								<option value='2'>Two</option>
								<option value='3'>Three</option>
							</select>
						</div>
					</div>
					{comments.map((comment) => (
						<div
							key={comment.createdAt}
							className='border-b border-slate-100 mb-4 pb-4'
						>
							<p className='mb-4 text-slate-400'>
								<span className='text-white font-semibold'>
									{comment.user.firstName} {comment.user.lastName}
								</span>{" "}
								on {moment(comment.createdAt).format("MMMM DD, YYYY")}
							</p>
							<p className='text-slate-400'>{comment.text} </p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Comment
