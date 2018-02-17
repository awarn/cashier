
import React from "react"

import Login from "components/Login"
import Profile from "components/Profile"
import TeamList from "components/TeamList"

import Auth from "./../../services/Auth.js";
const auth = new Auth();

export default class Work extends React.Component {
	constructor() {
		super()
	}

	login() {
		auth.login();
	}

	render() {
		const { isAuthenticated } = auth;

		return (
			<div>
			{
				!isAuthenticated() &&
					<div>
						<h1>Log in using Auth0</h1>
						<button
							className="form-control"
							onClick={this.login.bind(this)}>Log In</button>
					</div>
			}
			{
				isAuthenticated() && 
					<div className="container">
						<div className="col-sm-6">
							<Login/>
						</div>
						<div className="col-sm-6">
							<TeamList />
						</div>
						<div className="col-sm-6">
							<Profile auth={auth}/>
						</div>
					</div>
			}
			</div>
		)
	}
}

