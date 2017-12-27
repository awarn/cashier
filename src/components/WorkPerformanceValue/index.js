import React from "react"
import * as CashierAPI from "helpers/api"

export default class WorkPerformanceValue extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.value
		}
	}

	async getValue() {
		let value = await CashierAPI.get("/user/work/avg7");
		if (!Number.isNaN(value)) {
			this.setState({
				value: value
			})	
		}
	}

	componentWillMount() {
		this.getValue();
	}

	render() {
		return (
			<div>
				{ this.state.value === undefined ? <span>-</span> : <span><span className="h2">{this.state.value}</span> <span>avg sale value</span></span> }
			</div>
		)
	}
}