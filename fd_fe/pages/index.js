import React, { useState, useEffect } from "react"
import Head from "next/head"
import Landing from "../components/Landing"
import axios from "axios"

axios.interceptors.request.use(
	(request) => {
		// Edit request config
		debugger
		const sessionid = localStorage.getItem("sessionid")
		if (!request.headers.common.sessionid && sessionid) {
			request.headers.common.sessionid = sessionid
		}
		// logToConsole(request)
		return request
	},
	(error) => {
		console.log("REQUEST ERROR", error.response.data)
		// return error.response;
		return Promise.reject(error)
	}
)

export default function Home({ posts }) {
	return (
		<div>
			<Head>
				<meta property='og:url' content='http://localhost:3001' />
				<meta property='og:type' content='site' />
				<meta property='og:title' content='Order your food' />
				<meta
					property='og:description'
					content='Everything you need to know about Development.'
				/>
				<meta
					property='og:image'
					content='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
				/>
				<meta property='fb:app_id' content='3881343925425006' />
				<title>Omega FoodDelivery </title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Landing />
		</div>
	)
}
