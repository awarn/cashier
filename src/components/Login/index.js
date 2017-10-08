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
							<button
								className="btn-margin"
								onClick={this.login.bind(this)}
							>
								Log In
							</button>
						)
				}
				{
					isAuthenticated() && (
							<button
								className="btn-margin"
								onClick={this.logout.bind(this)}
							>
								Log Out
							</button>
						)
				}
      </div>
    )
	}
}