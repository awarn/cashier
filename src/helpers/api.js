
import Auth from "services/Auth"
const auth = new Auth()

const rootUrl = "http://localhost:8080/api"

export async function get(url, headers = {}) {
	auth.requireAPIAuth()

	let combinedHeaders = Object.assign(
		{
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Bearer " + auth.getAPIAccessToken()
		},
		headers)

	try {
		let profile = await auth.getProfile()
		let response = await fetch(rootUrl + url, {
			cache: false,
			headers: new Headers(combinedHeaders)
		})
		return response.json()
	} catch (error) {
		throw error
	}
}

export async function post(url, body, headers = {}) {
	auth.requireAPIAuth()
	
	let combinedHeaders = Object.assign(
		{
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Bearer " + auth.getAPIAccessToken()
		},
		headers)
	
	try {
		let profile = await auth.getProfile()
		let response = await fetch(rootUrl + url, {
			method: "POST",
			cache: false,
			headers: new Headers(combinedHeaders),
			body: JSON.stringify(body)
		})

		let contentType = response.headers.get("content-type");
		if(contentType && contentType.includes("application/json")) {
			return response.json()
		}
		else {
			throw new TypeError("Did not get JSON response from Cashier API.")
		}
	} catch (error) {
		throw error
	}
}
