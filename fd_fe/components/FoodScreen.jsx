import React, { useState, useEffect } from "react"
import moment from "moment"
import { PostCard, Categories, Pagination, CategoryChip } from "."
import Accent from "./custom/Accent"
const numberPerPage = 1
import LazyLoad from "react-lazyload"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import { LazyLoadImage } from "react-lazy-load-image-component"

const FoodScreen = ({ foodList }) => {
	console.log(foodList)
	return (
		<div className='container mx-auto my-14 px-5 sm:px-2 xs:px-3 lg:px-5 bg-gradient-to-tr text-slate-400'>
			<div className='my-8'>
				<h1 className='mb-5'>
					<Accent className='font-extrabold text-6xl'>Food Menu</Accent>
				</h1>
				<p className='display-4'>
					Ipsum enim labore ullamco velit sint ad do quis dolor anim voluptate irure.
					Officia et aliqua irure magna dolor proident tempor occaecat consectetur
					esse. Dolor reprehenderit proident sit esse dolor deserunt. Non
					reprehenderit est esse fugiat reprehenderit duis fugiat culpa deserunt et
					aute officia cillum. Proident aute ullamco laborum nulla nisi. Est qui nisi
					nulla ut nostrud. Mollit nulla labore adipisicing nostrud quis do in nisi
					fugiat. Ut excepteur voluptate do nulla elit culpa excepteur ad est magna
					est. Consequat est quis eu ipsum. Do non et ea mollit voluptate adipisicing
					eu labore aliquip enim. Non tempor est aliqua qui ipsum commodo labore
					aliqua amet exercitation reprehenderit.
				</p>
			</div>

			<div className='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-6'>
				{foodList.map((food, index) => (
					<PostCard className='' key={food.name} food={food} />
				))}
			</div>
		</div>
	)
}

export default FoodScreen
