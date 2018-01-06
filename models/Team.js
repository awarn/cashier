import mongoose, {Schema} from "mongoose"

const ObjectId = Schema.ObjectId
 
let teamSchema = new Schema({
	name: String,
	owners: [{ type : String }],
	created: Date
})

const Team = mongoose.model("Team", teamSchema)

module.exports = Team
