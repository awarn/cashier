
import React from "react"
import { post } from "helpers/api"
import Auth from "services/Auth"

const auth = new Auth();

export default class CreateTeam extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: ""
		}
	}

	async componentWillMount() {
		let profile = await auth.getProfile();
		this.setState({
			owner: profile.name
		});
	}

	handleNameInputChange(e) {
		this.setState({
			name: e.target.value
		});
	}

	async submitForm(e) {
		e.preventDefault();

		let { name, owner } = this.state;

		let res = await post("/team", {
			name: name,
			owners: [owner]
		});

		window.location.href = "/team";
	}

	render() {
		const { name, owner } = this.state;

		return (
			<div>
				{
					owner && 
						<div>
							<h3>Skapa ett team</h3>

							<form onSubmit={this.submitForm.bind(this)}>
								<label>
									Namn
									<input type="text" 
										name="name" 
										value={name}
										className="form-control"
										onChange={this.handleNameInputChange.bind(this)}/>
								</label>

								<input type="hidden" 
									name="owner" 
									value={owner}/>

								<input type="submit" 
									className="btn btn-primary form-control"
									value="Spara"/>
							</form>
						</div>
				}
			</div>
		)
	}
}