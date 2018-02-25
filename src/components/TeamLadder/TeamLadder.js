import React from "react"
import * as CashierAPI from "helpers/api"
import { round } from "lodash"

import s from "./TeamLadder.scss"

export default class TeamLadder extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			teamId: props.teamId
		};
	}

	async componentWillMount() {
		let team = await CashierAPI.get("/team?id="+this.state.teamId);
		
		team.members = [
			{
				id: "34y813n",
				name: "Anton"
			},
			{
				id: "n90056l",
				name: "Poya"
			},
			{
				id: "q23hf47",
				name: "Max"
			}
		];

		team.members.map((member) => {
			// TODO: real rating
			member.rating = Math.random() * 250 + 250;
		});

		if (team) {
			this.setState({
				team: team
			})	
		}
	}

	render() {
		const { team } = this.state;
		
		return (
			<div>
				{
					team && team.members && team.members.length > 0 &&
						<div>
							<h3>Ratings</h3>
							<table className="table">
							<thead>
								<tr>
									<th>Namn</th>
									<th>Rating</th>
								</tr>
							</thead>
							<tbody>
								{ 
									team.members
									.sort((a, b) => {
										if (a.rating > b.rating) {
											return -1;
										}
										else if (a.rating < b.rating) {
											return 1;
										}
										else {
											return 0;
										}
									})
									.map((member, index) => {
										return (
											<tr 
												key={`member-${index}`}
												className={member.rating >= 400 || index === 0 ? s.yellowjacket : null}>
												<td>{member.name}</td>
												<td>{round(member.rating, 2)}</td>
											</tr>
										)
									})
								}
							</tbody>
							</table>
						</div>
				}
			</div>
		)
	}
}
