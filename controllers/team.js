import Team from "../models/Team"

/**
 * GET /team
 * Get a single team.
 * @param {*} req Express.js req object
 * @param {*} res Express.js res object
 * @param {*} next Express.js next object
 */
export async function getTeam(req, res, next) {
	let id = req.query.id

	try {
		let team = await Team.findById(id)
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
	try {
		let teams = await Team.find()
		res.json(teams)
	} catch (error) {
		res.json(error)
	}
}

/**
 * POST /team
 * Create or update a team.
 * @param {*} req Express.js req object
 * @param {*} res Express.js res object
 * @param {*} next Express.js next object
 */
export async function postTeam(req, res, next) {
	//req.assert("name", "Please enter a valid name for the team.")
	/* req.sanitize("name")
	req.sanitize("owners")

	const valid = req.validationResult()

	if (!valid) {
		//TODO: API error controller call
	} */

	let id = req.body.id
	let name = req.body.name
	let owners = req.body.owners

	let team, message, errorResponse;

	if (id) {
		try {
			team = await Team.findById(id)

			team.name = name
			if (owners) {
				team.owners
			}

			message = "Team updated."
		} catch (error) {
			errorResponse = {
				result: "error",
				message: `Could not find a team by id ${id}`
			}
		}
	} else {
		try {
			team = new Team({
				name: name,
				owners: owners,
				created: new Date()
			})
		} catch (error) {
			errorResponse = {
				result: "error",
				message: "Could not create a team. Database error."
			}
		}
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
			else {
				res.json({
					result: "success",
					message: message
				})
			}
		})
	}
	else if (errorResponse) {
		res.json(errorResponse)
	}
	else {
		res.json({
			result: "error",
			message: "Could not save team: unknown error."
		})
	}
}

/**
 * POST /team/delete
 * Delete the specified team.
 * @param {*} req Express.js req object
 * @param {*} res Express.js res object
 * @param {*} next Express.js next object
 */
export async function deleteTeam(req, res, next) {
	let id = req.body.id;

	let result;

	if (id) {
		try {
			result = await Team.findByIdAndRemove(id);

			res.json({
				result: "success",
				message: `Team ${id} deleted.`
			})
		} catch (error) {
			res.json({
				result: "error",
				message: `Could not find and delete team ${id}`
			})
		}
	}
}
