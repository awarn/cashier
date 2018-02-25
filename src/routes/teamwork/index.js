
import React from "react"

import TeamLadder from "components/TeamLadder/TeamLadder"

export default class TeamWork extends React.Component {
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
				<div className="col-12">
					{
						teamId &&
							<TeamLadder teamId={teamId} />
					}
				</div>
			</section>
		)
	}
}
