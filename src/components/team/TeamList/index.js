
import React from "react"
import { get } from "helpers/api"

import CreateTeam from "components/team/CreateTeam"

export default class TeamList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			createTeam: false,
			teams: []
		}
	}

	async componentWillMount() {
		let teams = await get("/teams")

		if (teams) {
			this.setState({
				teams: teams
			})	
		}
	}

	toggleCreateTeam() {
		this.setState({
			createTeam: !this.state.createTeam
		})	
	}

	render() {
		const { teams, createTeamView } = this.state

		if (this.state.createTeam) {
			return (
				<div>
					<CreateTeam />
					<div>
						<button 
							title="Se listan över team"
							className="btn btn-secondary"
							onClick={this.toggleCreateTeam.bind(this)}>Lista</button>
					</div>
				</div>
			)
		} else {
			return (
				<div>
					{
						teams && teams.length > 0 &&
							<div>
								<h3>Team-lista</h3>
								<table className="table">
								<thead>
									<tr>
										<th>Namn</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{ teams.map((team, index) => {
										return (
											<tr key={`team-${index}`}>
												<td>{team.name}</td>
												<td><a href={`/team/${team._id}`}>Detaljer</a></td>
											</tr>
										)
									}) }
								</tbody>
								</table>
							</div>
					}
					<div>
						<button 
							title="Skapa ett nytt team"
							className="btn btn-secondary"
							onClick={this.toggleCreateTeam.bind(this)}>Skapa nytt</button>
					</div>
				</div>
			)	
		}
	}
}