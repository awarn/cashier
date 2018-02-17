
import React from "react"
import * as CashierAPIHelper from "helpers/api"

export default class Team extends React.Component {
	constructor(props) {
		super(props)
	}

	async componentWillMount() {
		let team = await CashierAPIHelper.get("/team?teamId=123")

		if (team) {
			this.setState({
				team: team
			})	
		}
	}

	render() {
		const { team } = this.state

		return (
			<div>
				<h3>{team.name}</h3>
				{
					team.owners && team.owners.length > 0 &&
						<ul>
							{ team.owners.map((team, index) => {
								return (<li key={`team-${index}`}>{team.name}</li>)
							}) }
						</ul>
				}
			</div>
		)
	}
}