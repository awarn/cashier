import React from "react";
import * as CashierAPI from "helpers/api";
import { round } from "lodash";

export default class WorkPerformanceValue extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: props.value
		};
	}

	async getValue() {
		let value = await CashierAPI.get(this.props.url);

		if (value && !isNaN(value)) {
			this.setState({
				value: value
			});
		}
	}

	componentWillMount() {
		this.getValue();
	}

	render() {
		const { value } = this.state;
		return (
			<div>
				{
					value &&
						<span><span className="h2">{round(value, 2)}</span> <span>(genomsnitt)</span></span>
				}
			</div>
		);
	}
}
