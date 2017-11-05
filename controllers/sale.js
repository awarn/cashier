import Keen from "keen-js"

const client = new Keen({
	projectId: process.env.KEEN_PROJECT_ID,
	readKey: process.env.KEEN_READ_KEY,
	writeKey: process.env.KEEN_WRITE_KEY
});

exports.avgValueSevenDays = () => {
	return client
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