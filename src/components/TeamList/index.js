
import React from "react"
import * as CashierAPIHelper from "helpers/api"

export default class TeamList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
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

	render() {
		const { teams } = this.state
		return (
			<div>
				<h3>Team-lista</h3>
				<ul>
					{ teams.map((team, index) => {
						return (<li key={`team-${index}`}>{team.name}</li>)
					}) }
				</ul>
			</div>
		)
	}
}