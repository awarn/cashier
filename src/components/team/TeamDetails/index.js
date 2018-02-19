
import React from "react"
import { get, post } from "helpers/api"

export default class Team extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			teamId: props.teamId
		}
	}

	async componentWillMount() {
		let team = await get("/team?id="+this.state.teamId)

		if (team) {
			this.setState({
				team: team
			})	
		}
	}

	handleNameInputChange(e) {
		this.setState({
			team: {
				name: e.target.value
			}
		});
	}

	async updateTeam(e) {
		e.preventDefault();

		let { _id, name } = this.state.team;

		let res = await post("/team", {
			id: _id,
			name: name
		});
	}

	async deleteTeam(e) {
		e.preventDefault();

		let { _id } = this.state.team;

		let res = await post("/team/delete", {
			id: _id
		});

		window.location.href="/team"
	}

	render() {
		const { team, teamId } = this.state

		/*
		<form onSubmit={this.updateTeam.bind(this)}>
			<input type="text" 
				name="name" 
				value={team.name}
				onChange={this.handleNameInputChange.bind(this)}
				className="form-control"/>

			<input type="submit" 
				className="btn btn-primary form-control"
				value="Spara"/>
		</form>
		*/

		return (
			<div>
				{
					team &&
						<div>
							<h2>{team.name}</h2>

							<hr />

							<h3>Ägare</h3>

							{
								team.owners && team.owners.length > 0 &&
									<ul className="list-inline">
										{ team.owners.map((owner, index, array) => {
											if (index === array.length - 1) {
												return (<li key={`owner-${index}`} className="list-inline-item">{owner}</li>)
											} else {
												return (<li key={`owner-${index}`} className="list-inline-item">{owner},</li>)
											}
										}) }
									</ul>
							}

							<hr />

							<h3>Administration</h3>

							<button 
								onClick={this.deleteTeam.bind(this)}
								className="btn btn-danger">Ta bort</button>
						</div>
				}
				{
					!team &&
						<div>Laddar...</div>
				}
			</div>
		)
	}
}