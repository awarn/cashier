
import React from "react"

import {Button, Panel, FormControl, FormGroup, ControlLabel, HelpBlock} from "react-bootstrap"

import Auth from "./../../services/Auth.js";
const auth = new Auth();

export default class Dev extends React.Component {
	constructor() {
		super()

		this.state = {
			amount: "400"
		}
	}

  getValidationState() {
    const length = this.state.amount.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }

  handleChange(e) {
    this.setState({ amount: e.target.value });
  }

	render() {
		return (
			<div className="container">
				<div className="col-sm-6">
					<Panel header="Add sales">
						<form>
							<FormGroup
								controlId="formBasicText"
								validationState={this.getValidationState()}
							>
								<ControlLabel>Working example with validation</ControlLabel>
								<FormControl
									type="text"
									value={this.state.amount}
									placeholder="Enter text"
									onChange={this.handleChange.bind(this)}
								/>
								<FormControl.Feedback />
								<HelpBlock>Validation is based on string length.</HelpBlock>
							</FormGroup>
						</form>
					</Panel>
				</div>
			</div>
		)
	}
}

