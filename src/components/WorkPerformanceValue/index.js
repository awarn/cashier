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
						property_value: "59918f209dc4a899d7975896"
					}
				],
				timezone: "Europe/Paris",
				timeframe: "this_7_days"
			})
			.then(result => {
				this.setState({
					value: result.result
				})
			})
			.catch(error => {
				console.log(error)
			});
	}

	render() {
		return (
			<div>
				{ this.state.result === undefined ? "" : <span><span className="h2">{this.state.value}</span> <span>avg sale value</span></span> }
			</div>
		)
	}
}