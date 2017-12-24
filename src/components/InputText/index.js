import React from "react"

import s from "./style.scss"

export default class Dev extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			value: props.value
		}

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({value: event.target.value})
		this.props.handleChange(event)
	}

	render() {
		return (
			<input
				type="text"
				className={s.input}
				value={this.state.value}
				onChange={this.handleChange}
				placeholder={this.props.placeholder || ""} />
		)
	}
}