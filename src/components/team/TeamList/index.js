
import React from "react"
import * as CashierAPIHelper from "helpers/api"

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
		let teams = await CashierAPIHelper.get("/team?teamId=123")

		if (teams) {
			this.setState({
				teams: [teams]
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

		console.log(teams)

		if (this.state.createTeam) {
			return (
				<div>
					<CreateTeam />
					<div>
						<button 
							title="Se listan över team"
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
								<ul>
									{ teams.map((team, index) => {
										return (<li key={`team-${index}`}>{team.name}</li>)
									}) }
								</ul>
							</div>
					}
					<div>
						<button 
							title="Skapa ett nytt team"
							onClick={this.toggleCreateTeam.bind(this)}>Skapa nytt</button>
					</div>
				</div>
			)	
		}
	}
}