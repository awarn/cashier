import React from "react"
import * as CashierAPI from "helpers/api"

export default class WorkPerformanceValue extends React.Component {
	constructor() {
		super()
		this.state = {
			value: ""
		}
	}

	async getValue() {
		let value = await CashierAPI.get("/");
		this.setState({
			value: value
		})
	}

	componentWillMount() {
		this.getValue();
	}

	render() {
		return (
			<div>
				{ this.state.value === undefined ? "" : <span><span className="h2">{this.state.value}</span> <span>avg sale value</span></span> }
			</div>
		)
	}
}