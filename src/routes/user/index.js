
import React from "react"

import Login from "components/Login"
import Profile from "components/Profile"
import TeamList from "components/team/TeamList"

import Auth from "./../../services/Auth.js";
const auth = new Auth();

export default class Work extends React.Component {
	constructor() {
		super()
	}

	render() {
		const { isAuthenticated } = auth;

		return (
			<div>
				{
					!isAuthenticated() &&
						<div className="container">
							<div className="col-sm-6">
								<Login/>
							</div>
						</div>
				}
				{
					isAuthenticated() &&
						<div className="container">
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

