
import Keen from "keen-js"

const dotenv = require("dotenv")
dotenv.load({ path: ".env" })

const client = new Keen({
	projectId: process.env.KEEN_PROJECT_ID,
	readKey: process.env.KEEN_READ_KEY,
	writeKey: process.env.KEEN_WRITE_KEY
})

const STREAMS = [
	"sales"
]

/* async function keenQuery(type, eventCollection, targetProperty, timeframe, filters) {
	return 
} */

/**
 * Record a JSON object as an event in a Keen.io stream.
 * @param {string} streamName The Keen.io stream to record the event to. Only accepts values from STREAMS.
 * @param {*} event JSON object representing the event.
 */
async function keenRecordEvent(streamName, event) {
	if (STREAMS.indexOf(streamName) == -1) {
		throw new Error(`"${streamName}" is not an acceptable Keen stream name.`)
	}
	else {
		return new Promise((resolve, reject) => {
			client.recordEvent(streamName, event, (err, res) => {
				if (err) {
					reject(err)
				}
				else {
					resolve(res)
				}
			})
		})
	}
}

/**
 * Record a JSON object as a sale in the Keen.io "sales" stream.
 * @param {*} sale JSON object representing the sale event.
 */
async function keenRecordSale(sale) {
	try {
		return await keenRecordEvent("sales", sale)
	} catch (error) {
		throw error
	}
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
		let response = await keenRecordSale(saleEvent)
		res.json(response)
	} catch (error) {
		res.json(error)
	}
}

export async function avgValueSevenDays(req, res) {
	let user = req.params.user || req.body.user || req.query.user

	return client.query("average", {
		event_collection: "sales",
		target_property: "charged",
		filters: [
			{
				property_name: "user",
				operator: "eq",
				property_value: user
			}
		],
		timezone: "Europe/Paris",
		timeframe: "this_7_days"
	})
	.then(response => {
		res.json(response.result)
	})
	.catch(error => {
		res.json(error)
	})
}

export async function totalToday(req, res) {
	let user = req.params.user || req.body.user || req.query.user

	return client.query("sum", {
		event_collection: "sales",
		target_property: "charged",
		filters: [
			{
				property_name: "user",
				operator: "eq",
				property_value: user
			}
		],
		timezone: "Europe/Paris",
		timeframe: "this_1_days"
	})
	.then(response => {
		res.json(response.result)
	})
	.catch(error => {
		res.json(error)
	})
}
