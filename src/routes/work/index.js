
import React from "react";

import WorkBar from "components/WorkBar";
import WorkPerformanceValue from "components/WorkPerformanceValue";

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
						<h1>Jobb</h1>
					</div>
				</div>
				<div className="container">
					<div className="col-sm-6">
						<h2>Ditt team</h2>
						<p className="text-success">Veckans mål uppnått!</p>
						<WorkBar/>
					</div>
				</div>
				<div className="container">
					<div className="col-12">
						<h2>Din dag</h2>
					</div>
					{
						profile &&
							<div className="col-sm-6">
								<WorkPerformanceValue url={`/user/work/avg7?user=${profile.name}`}/>
							</div>
					}
				</div>
			</div>
		)
	}
}

