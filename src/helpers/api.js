
import Auth from "services/Auth"
const auth = new Auth()

const rootUrl = "http://localhost:8080/api"

export async function get(url, headers = {}) {
	auth.requireAPIAuth()

	let allHeaders = Object.assign(
		{
			"Accept": "application/json",
			"Authorization": "Bearer " + auth.getAPIAccessToken()
		},
		headers)

	try {
		let value = await fetch(rootUrl + url, {
			cache: false,
			headers: new Headers(allHeaders)
		})
	} catch (error) {
		throw error
	}
}

export async function post(url, body, headers = {}) {
	auth.requireAPIAuth()
	
	let allHeaders = Object.assign(
		{
			"Accept": "application/json",
			"Authorization": "Bearer " + auth.getAPIAccessToken()
		},
		headers)
	
	try {
		let value = await fetch(rootUrl + url, {
			method: "POST",
			cache: false,
			headers: new Headers(allHeaders),
			body: JSON.stringify(body)
		})
	} catch (error) {
		throw error
	}
}
