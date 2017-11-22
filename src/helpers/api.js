
import "whatwg-fetch"
import Auth from "services/Auth"
const auth = new Auth()

const rootUrl = "http://localhost:8080/api"

export async function get(url) {
	if (!auth.isAPIAuthenticated()) {
		auth.loginAPI()
	}

	try {
		let value = await fetch(rootUrl + url, {
			cache: false,
			headers: { "Authorization": "Bearer " + auth.getAPIAccessToken() }
		})
	} catch (error) {
		throw error
	}
}
