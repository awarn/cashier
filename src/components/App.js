
import Login from "./Login"
import Main from "./Main"
import Navigation from "./Navigation"
import React from "react"

export default class App extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div>
				<Navigation/>
				<Main/>
			</div>
		)
	}
}

