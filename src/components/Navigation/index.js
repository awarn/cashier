
import React from "react"

export default class Navigation extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="/">Cashier</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<a className="nav-link" href="/work/day">Work</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/user">User</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/team">Team</a>
						</li>
						<li className="nav-item">
							<a className="nav-link text-warning" href="/dev">Dev</a>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}

