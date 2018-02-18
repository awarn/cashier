
import React from "react"

import TeamList from "components/team/TeamList"
import TeamDetails from "components/team/TeamDetails"

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default class Work extends React.Component {
	constructor() {
		super();
	}

	render() {
		let teamId = getParameterByName("id");

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
