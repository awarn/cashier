
import React from "react"

import {Button, Panel, Form, FormControl, FormGroup, ControlLabel, HelpBlock} from "react-bootstrap"
import InputText from "components/InputText"

import { post } from "helpers/api"

import Auth from "services/Auth.js"
const auth = new Auth()

const placeholder = {
	charged: 120
}

export default class Dev extends React.Component {
	constructor() {
		super()

		this.state = {
			charged: placeholder.charged
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	getValidationState() {
		const length = this.state.charged.length
		if (length > 10) return "success"
		else if (length > 5) return "warning"
		else if (length > 0) return "error"
		return null
	}

	handleChargedChanged(e) {
		this.setState({ charged: Number.parseFloat(e.target.value) })
	}
	
	handleSubmit(event) {
		event.preventDefault()

		if (this.state.charged) {
			(async () => {
				try {
					let profile = await auth.getProfile()

					let headers = {
						"Accept": "application/json",
						"Content-Type": "application/json"
					}

					let body = {
						user: profile.name,
						charged: this.state.charged
					}

					post("/sale", body, headers)
				} catch (error) {
					console.error(error)
				}
			})()
		}
	}

	render() {
		return (
			<div className="container">
				<div className="col-sm-6">
					<Panel header="Add sales">
						<form onSubmit={this.handleSubmit}>
							<FormGroup
								controlId="formBasicText"
								validationState={this.getValidationState()}>
								
								<ControlLabel>For trial purposes</ControlLabel>

								<InputText placeholder="Enter value" value={placeholder.charged} handleChange={this.handleChargedChanged.bind(this)} />

								<FormControl.Feedback/>

								<HelpBlock>Validation is based on string length.</HelpBlock>
							</FormGroup>

							<Button type="submit">Submit</Button>
						</form>
					</Panel>
				</div>
			</div>
		)
	}
}

