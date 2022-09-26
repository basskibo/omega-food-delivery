import React from "react"
import { FoodScreen } from "../../components"
import axios from "axios"

const food = ({ data }) => {
	const { foodList } = data
	return (
		<div>
			<FoodScreen foodList={foodList} />
		</div>
	)
}

export default food

export const getStaticProps = async () => {
	const { data } = await axios.get("http://localhost:3000/api/food")
	return {
		props: {
			data,
		},
	}
}
