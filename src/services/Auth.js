import auth0 from "auth0-js"
import history from "./History"

export default class Auth {
	userProfile

	constructor() {
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
		this.handleAuthentication = this.handleAuthentication.bind(this)
		this.isAuthenticated = this.isAuthenticated.bind(this)
		this.getProfile = this.getProfile.bind(this)
		
		this.auth0 = new auth0.WebAuth({
			domain: process.env.AUTH0_DOMAIN,
			clientID: process.env.AUTH0_CLIENT_ID,
			redirectUri: "http://localhost:8080/welcome",
			audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
			responseType: "token id_token",
			scope: "openid profile"
		})
		
		this.auth0Sales = new auth0.WebAuth({
			domain: process.env.AUTH0_DOMAIN,
			clientID: process.env.AUTH0_CLIENT_ID,
			redirectUri: "http://localhost:8080/welcome",
			audience: "http://localhost:8080/api",
			responseType: "token",
			scope: "read:sales write:sales"
		})
	}

	/**
	 * 
	 */
	handleAuthentication() {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult)
				history.replace("/")
			}
			else if (authResult && authResult.accessToken) {
				this.setAPISession(authResult)
				history.replace("/")
			}
			else if (err) {
				history.replace("/")
				console.log(err)
			}
			else {
				history.replace("/")
				console.log("An unknown error occured when authenticating.")
			}
		})
	}
	
	/**
	 * Check for the presence of a login. Technically: Is the access token past expiry time?
	 */
	isAuthenticated() {
		// Check whether the current time is past the access token"s expiry time
		let expiresAt = JSON.parse(localStorage.getItem("auth0_expires_at"))

		return new Date().getTime() < expiresAt
	}

	isAPIAuthenticated() {
		let apiToken = localStorage.getItem("auth0_api_access_token")

		let expiresAt = JSON.parse(localStorage.getItem("auth0_api_expires_at"))

		if (apiToken && new Date().getTime() < expiresAt) {
			return true
		}
		return false
	}

	/**
	 * Check for authentication, and if missing send the user to login.
	 */
	requireAuth() {
		if(!this.isAuthenticated()) {
			this.login()
		}
	}

	requireAPIAuth() {
		if(!this.isAPIAuthenticated()) {
			this.loginAPI()
		}
	}

	/**
	 * Create a user session using Auth0, with variables in localstorage.
	 * @param {*} authResult The result provided by Auth0 parseHash function
	 */
	setSession(authResult) {
		// Set the time that the access token will expire at
		let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
		localStorage.setItem("auth0_expires_at", expiresAt)

		localStorage.setItem("auth0_access_token", authResult.accessToken)

		localStorage.setItem("auth0_id_token", authResult.idToken)
		// navigate to the home route
		//history.replace("/")
	}

	/**
	 * 
	 * @param {*} authResult The result provided by Auth0 parseHash function
	 */
	setAPISession(authResult) {
		let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
		localStorage.setItem("auth0_api_expires_at", expiresAt)

		localStorage.setItem("auth0_api_access_token", authResult.accessToken)
	}

	/**
	 * Points the browser to Auth0 authentication page. Details, including callback page, are set in the constructor of this service class.
	 */
	login() {
		this.auth0.authorize()
	}

	loginAPI() {
		this.auth0Sales.authorize()
	}

	/**
	 * Remove Auth0 session variables from localstorage.
	 */
	logout() {
		// Clear access token and ID token from local storage
		localStorage.removeItem("auth0_access_token")
		localStorage.removeItem("auth0_id_token")
		localStorage.removeItem("auth0_expires_at")
		localStorage.removeItem("auth0_api_access_token")
		localStorage.removeItem("auth0_api_expires_at")
		// navigate to the home route
		history.replace("/")
	}

	getAccessToken() {
		const accessToken = localStorage.getItem("auth0_access_token")
		if (!accessToken) {
			throw new Error("No access token found")
		}
		return accessToken
	}

	getIdToken() {
		const idToken = localStorage.getItem("auth0_id_token")
		if (!idToken) {
			throw new Error("No id token found")
		}
		return idToken
	}

	getAPIAccessToken() {
		const apiAccessToken = localStorage.getItem("auth0_api_access_token")
		if (!apiAccessToken) {
			throw new Error("No API access token found")
		}
		return apiAccessToken
	}

	async getProfile() {
		try {
			let accessToken = this.getAccessToken()
			return new Promise((resolve, reject) => this.auth0.client.userInfo(accessToken, (error, profile) => {
				if (profile) {
					this.userProfile = profile
					resolve(profile)
				}
				reject(error)
			}))
		} catch (error) {
			throw error
		}
	}
}