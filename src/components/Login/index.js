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
								<h1>Log in using Auth0</h1>
								<button
									className="btn-margin"
									onClick={this.login.bind(this)}
								>
									Log In
								</button>
							</div>
						)
				}
				{
					isAuthenticated() && (
							<div>
								<h1>You are logged in</h1>
								<button
									className="btn-margin"
									onClick={this.logout.bind(this)}
								>
									Log Out
								</button>
							</div>
						)
				}
      </div>
    )
	}
}