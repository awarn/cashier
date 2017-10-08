
import React from "react"

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
						<h1>Work</h1>
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

