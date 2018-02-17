import * as Team from "../models/Team"

/**
 * POST /team
 * Create or update a team.
 * @param {*} req Express.js req object
 * @param {*} res Express.js res object
 * @param {*} next Express.js next object
 */
export async function postTeam(req, res, next) {
	/* req.assert("name", "Please enter a valid name for the team.").is
	req.sanitize("name") */

	console.log(req.params)
	console.log(req.body)
	console.log(req.query)

	let teamId = req.params.teamId || req.body.teamId || req.query.teamId
	let name = req.params.name || req.body.name || req.query.name
	let owners = req.params.owners || req.body.owners || req.query.owners

	const errors = req.validationErrors()

	console.log(errors)

	if (errors) {
		//TODO: API error controller call
	}


	let team, message;

	if (teamId) {
		try {
			team = await Team.findById(teamId)

			team.name = name
			team.owners = owners

			message = "Team updated."
		} catch (error) {
			res.json(error)
		}
	} else {
		console.log(name)

		team = new Team({
			name: name,
			owners: owners,
			created: new Date()
		})

		message = "Team created."
	}

	if (team) {
		team.save((err) => {
			if (err) {
				res.json({
					result: "error",
					message: "Could not save team."
				})
			}
			res.json({
				result: "success",
				message: message
			})
		})
	}
	else {
		return res.json({
			result: "error",
			message: "Could not save team."
		})
	}
}

/**
 * GET /team
 * Get a single team.
 * @param {*} req Express.js req object
 * @param {*} res Express.js res object
 * @param {*} next Express.js next object
 */
export async function getTeam(req, res, next) {
	let teamId = req.params.teamId || req.body.teamId || req.query.teamId

	try {
		let team = await Team.findById(teamId)
		res.json(team)
	} catch (error) {
		res.json(error)
	}
}


/**
 * GET /teams
 * Get all the teams a user belongs to.
 * @param {*} req Express.js req object
 * @param {*} res Express.js res object
 * @param {*} next Express.js next object
 */
export async function getTeams(req, res, next) {
	let teamId = req.params.teamId || req.body.teamId || req.query.teamId

	try {
		let teams = await Team.find()
		res.json(teams)
	} catch (error) {
		res.json(error)
	}
}
