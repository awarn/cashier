import React from "react"
import * as CashierAPI from "helpers/api"

export default class WorkPerformanceValue extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			value: props.value || "~"
		}
	}

	async getValue() {
		let value = await CashierAPI.get("/user/work/avg7")

		if (value && !isNaN(value)) {
			this.setState({
				value: value
			})	
		}
	}

	componentWillMount() {
		this.getValue()
	}

	render() {
		return (
			<div>
				<span><span className="h2">{this.state.value}</span> <span>(genomsnitt)</span></span>
			</div>
		)
	}
}