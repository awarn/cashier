
import React from "react"
import { Panel, ControlLabel, Glyphicon } from "react-bootstrap"

import s from "./style.scss"

export default class Profile extends React.Component {
	constructor() {
		super()
	}

	componentWillMount() {
		this.setState({ profile: {} })
		const { userProfile, getProfile, isAuthenticated } = this.props.auth
		if ( isAuthenticated() && !userProfile) {
			(async () => {
				let profile = await getProfile()
				this.setState({ profile })
			})()
		} else {
			this.setState({ profile: userProfile })
		}
	}

	render() {
		const { profile } = this.state
		return (
			<div className={s.profile}>
			{ profile &&
				<div>
					<h1>{profile.name}</h1>
					<Panel header="Profile">
						<img src={profile.picture} alt="profile" />
						<div>
							<ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
							<h3>{profile.nickname}</h3>
						</div>
						<pre>{JSON.stringify(profile, null, 2)}</pre>
					</Panel>	
				</div>
			}
			</div>
		)
	}
}