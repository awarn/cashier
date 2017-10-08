
import React from "react"

import Login from "./../../components/Login"

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
				</div>
			</div>
		)
	}
}

