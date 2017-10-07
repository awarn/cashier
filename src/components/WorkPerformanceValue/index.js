import React from "react"
import Keen from "keen-js"

export default class WorkPerformanceValue extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

	componentWillMount() {
		const client = new Keen({
			projectId: process.env.KEEN_PROJECT_ID,
			readKey: process.env.KEEN_READ_KEY
		});

		client
			.query("average", {
				event_collection: "sale",
				target_property: "value",
				filters: [
					{
						property_name: "user",
						operator: "eq",
						//property_value: req.user._id
					}
				],
				timezone: "Europe/Paris",
				timeframe: "this_7_days"
			})
			.then(result => {
				console.log(result);
				/* this.setState({
					value: result.result
				}) */
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div>
				<span className="h1">{this.state.value}</span> <span className="h4">avg sale value</span>
			</div>
		)
	}
}