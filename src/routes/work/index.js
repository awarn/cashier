
import React from "react";
import { Switch, Route } from "react-router-dom"

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
		const path = this.props.location.pathname;

		return (
			<div>
				<div className="container">
					<div className="col-12">
						<ul className="nav nav-pills nav-fill">
							<li className="nav-item">
								<a 
									href="/work/day"
									className={"nav-link " + (path == "/work/day" ? "active" : "")} >Dag</a>
							</li>
							<li className="nav-item">
								<a 
									href="/work/week"
									className={"nav-link " + (path == "/work/week" ? "active" : "")} >Vecka</a>
							</li>
							<li className="nav-item">
								<a 
									href="/work/month"
									className={"nav-link " + (path == "/work/month" ? "active" : "")} >Månad</a>
							</li>
						</ul>
					</div>
				</div>

				<hr/>

				<Switch>
					<Route path="/work/day" render={(props) => {
						return (
							<div className="container">
								<div className="col-sm-6">
									{
										profile &&
											<WorkDay profile={profile} {...props} />
									}
								</div>
							</div>
						)
					}}/>

					<Route path="/work/week" render={(props) => {
						return (
							<div className="container">
								<div className="col-sm-6">
									blargh
								</div>
							</div>
						)
					}}/>
				</Switch>
			</div>
		)
	}
}

