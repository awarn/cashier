
import Keen from "keen-js"

const dotenv = require("dotenv")
dotenv.load({ path: ".env" })

const client = new Keen({
	projectId: process.env.KEEN_PROJECT_ID,
	readKey: process.env.KEEN_READ_KEY,
	writeKey: process.env.KEEN_WRITE_KEY
})

async function keenRecordEvent(event) {
	return new Promise((resolve, reject) => {
		client.recordEvent("sales", event, (err, res) => {
			if (err) {
				reject(err)
			}
			else {
				resolve(res.result)
			}
		})
	})
}

export async function pushSale(req, res) {
	let user = req.body.user
	let charged = req.body.charged
	let items = req.body.items
	let campaigns = req.body.campaigns

	const saleEvent = {
		user: user,
		items: items,
		charged: charged,
		campaigns: campaigns,
		keen: {
			timestamp: new Date().toISOString()
		}
	}

	try {
		let result = await keenRecordEvent(saleEvent)
		res.json(result)
	}
	catch (error) {
		res.json(error)
	}
}

export async function avgValueSevenDays(req, res) {
	let user_id = req.param("user") || req.body.user
	
	return client
		.query("average", {
			event_collection: "sales",
			target_property: "charged",
			filters: [
				{
					property_name: "user",
					operator: "eq",
					property_value: user_id
				}
			],
			timezone: "Europe/Paris",
			timeframe: "this_7_days"
		})
		.then(response => {
			return response.result
		})
		.catch(error => {
			console.log(error)
		})
}