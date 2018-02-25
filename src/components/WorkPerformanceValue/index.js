import React from "react";
import * as CashierAPI from "helpers/api";
import { round } from "lodash";

export default class WorkPerformanceValue extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: props.value,
			unit: props.unit
		};
	}

	async getValue() {
		let value = await CashierAPI.get(this.props.url);

		if (!isNaN(value)) {
			this.setState({
				value: value
			});
		}
	}

	componentWillMount() {
		this.getValue();
	}

	render() {
		const { value, unit } = this.state;

		return (
			<div>
				{
					(value || value == 0) &&
						<span className="h2">{round(value, 2)}<span> {unit}</span></span>
				}
			</div>
		);
	}
}
