
import React from "react"
import Navigation from "./Navigation"
import Main from "./Main"

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

