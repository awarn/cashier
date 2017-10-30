
import React from "react"

import WorkBar from "./../../components/WorkBar"
import WorkPerformanceValue from "./../../components/WorkPerformanceValue"

export default class Work extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="col-sm-6">
						<h1>Jobb</h1>
					</div>
				</div>
				<div className="container">
					<div className="col-sm-6">
						<h2>Ditt team</h2>
						<WorkBar/>
					</div>
					<div className="col-sm-6">
						<h2>Din dag</h2>
					</div>
				</div>
				<div className="container">
					<div className="col-sm-6">
						<WorkPerformanceValue/>
					</div>
					<div className="col-sm-6">
						<WorkPerformanceValue/>
					</div>
				</div>
			</div>
		)
	}
}

