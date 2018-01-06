import * as Team from "../models/Team"

/**
 * POST /team
 * Create or update a team
 * @param {*} req Express.js req object
 * @param {*} res Express.js res object
 * @param {*} next Express.js next object
 */
export async function postTeam(req, res, next) {
	/* req.assert("name", "Please enter a valid name for the team.").is
	req.sanitize("name") */

	let teamId = req.params.teamId || req.body.teamId || req.query.teamId
	let name = req.params.name || req.body.name || req.query.name
	let owners = req.params.owners || req.body.owners || req.query.owners

	const errors = req.validationErrors()

	if (errors) {
		//TODO: API error controller call
	}

	let team, message;

	(async () => {
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
	})()
}

/**
 * GET /team
 * Get a single team
 * @param {*} req Express.js req object
 * @param {*} res Express.js res object
 * @param {*} next Express.js next object
 */
export async function getTeam(req, res, next) {
	let teamId = req.params.teamId || req.body.teamId || req.query.teamId

	(async () => {
		try {
			let team = await Team.findById(teamId)
			res.json(team)
		} catch (error) {
			res.json(error)
		}
	})()
}
