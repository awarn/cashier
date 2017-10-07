
import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "../../routes/home"
import Work from "../../routes/work"

export default class Main extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<main>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/work" component={Work}/>
				</Switch>
			</main>
		)
	}
}

