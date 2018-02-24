
import React from "react";

import WorkBar from "components/WorkBar";
import WorkDay from "components/WorkDay";

import Auth from "services/Auth";
const auth = new Auth();

export default class Work extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	async componentWillMount() {
		let profile = await auth.getProfile();

		this.setState({
			profile: profile
		})
	}

	render() {
		const { profile } = this.state;

		return (
			<div>
				<div className="container">
					<div className="col-sm-6">
						{
							profile &&
								<WorkDay profile={profile} />
						}
					</div>
				</div>
			</div>
		)
	}
}

