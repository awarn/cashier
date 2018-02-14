import React from "react"
import * as CashierAPI from "helpers/api"
import { round } from "lodash"

export default class WorkPerformanceValue extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			value: props.value || 0
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
				<span><span className="h2">{round(this.state.value, 2)}</span> <span>(genomsnitt)</span></span>
			</div>
		)
	}
}