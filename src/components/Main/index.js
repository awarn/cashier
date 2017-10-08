
import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "../../routes/home"
import User from "../../routes/user"
import Welcome from "../../routes/welcome"
import Work from "../../routes/work"

import Auth from "../../services/Auth"
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export default class Main extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<main>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/user" component={User}/>
					<Route path="/welcome" render={(props) => {
						handleAuthentication(props)
						return (<Welcome {...props}/>)
					}}/>
					<Route path="/work" component={Work}/>
				</Switch>
			</main>
		)
	}
}

