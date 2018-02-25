
import React from "react"

import TeamList from "components/team/TeamList"
import TeamDetails from "components/team/TeamDetails"

export default class Team extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			teamId: props.match.params.teamId
		};
	}

	render() {
		const { teamId } = this.state;
		
		return (
			<section className="container">
				{
					teamId &&
						<TeamDetails teamId={teamId} />
				}
				{
					!teamId &&
						<TeamList />
				}
			</section>
		)
	}
}
