
import React from "react"
import {defaultValue, round} from "services/Utils.js"

import s from "./style.scss"

export default class WorkBarShare extends React.Component {
	constructor() {
		super()

		this.state = {
			text: "...",
			proportion: 0,
			focus: false
		}
	}

	getClassName() {
		return this.state.focus ? s.focus : s.normal
	}

	handleClick() {
		this.setState({
			focus: !this.state.focus,
			text: !this.state.focus ? `${round(100 * this.state.proportion, 1)}%` : this.props.args.text
		})
	}

	componentWillMount() {
		this.setState({
			text: defaultValue(this.props.args.text, this.state.text),
			proportion: defaultValue(this.props.args.proportion, this.state.proportion)
		})
	}

	render() {
		let style = {
			width: `${100 * this.state.proportion}%`
		}

		return (
			<div
				onClick={this.handleClick.bind(this)}
				className={this.getClassName()}
				style={style}>{this.state.text}</div>
		)
	}
}

