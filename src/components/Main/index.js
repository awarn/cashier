
import React from "react"
import { Switch, Route } from "react-router-dom"

import Dev from "routes/dev"
import Home from "../../routes/home"
import Team from "routes/team"
import User from "../../routes/user"
import Welcome from "../../routes/welcome"
import Work from "../../routes/work"

import Auth from "../../services/Auth"
const auth = new Auth()

import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect"

import "./Main.scss"

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

const userIsAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: "/user",
  // Determine if the user is authenticated or not
  authenticatedSelector: auth.isAuthenticated,
  // A nice display name for this check
  wrapperDisplayName: "UserIsAuthenticated"
})

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
					<Route path="/work/:timeframe" component={userIsAuthenticated(Work)}/>
					<Route path="/team" component={userIsAuthenticated(Team)}/>
					<Route path="/dev" component={userIsAuthenticated(Dev)}/>
				</Switch>
			</main>
		)
	}
}

