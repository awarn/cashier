
import React from "react"

import Login from "components/Login"
import Profile from "components/Profile"

import Auth from "./../../services/Auth.js";
const auth = new Auth();

export default class Work extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="col-sm-6">
						<Login/>
					</div>
					<div className="col-sm-6">
						<Profile auth={auth}/>
					</div>
				</div>
			</div>
		)
	}
}

