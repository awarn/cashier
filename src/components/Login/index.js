import Auth from "./../../services/Auth.js";
const auth = new Auth();

import React from "react"

export default class Navigation extends React.Component {
	constructor() {
		super()
	}

	login() {
		auth.login();
	}

	logout() {
		auth.logout();
	}

	render() {
		const { isAuthenticated } = auth;

		return (
			<div>
				{
					!isAuthenticated() && (
							<div>
								<button
									className="btn btn-primary"
									onClick={this.login.bind(this)}>Logga in med Auth0</button>
							</div>
						)
				}
				{
					isAuthenticated() && (
							<div>
								<button
									className="btn btn-secondary"
									onClick={this.logout.bind(this)}>Logga ut</button>
							</div>
						)
				}
			</div>
		)
	}
}