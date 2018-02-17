
import React from "react"
import * as CashierAPIHelper from "helpers/api"
import Auth from "services/Auth"

const auth = new Auth();

export default class CreateTeam extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: ""
		}
	}

	handleNameInputChange(e) {
		this.setState({
			name: e.target.value
		});
	}

	async componentWillMount() {
		let profile = await auth.getProfile();
		this.setState({
			owner: profile.name
		});
	}

	async submitForm(e) {
		e.preventDefault();

		let { name, owner } = this.state;

		let res = await CashierAPIHelper.post("/team", {
			name: name,
			owners: [owner]
		});

		console.log(res);
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
								<input type="text" 
									name="name" 
									value={name}
									onChange={this.handleNameInputChange.bind(this)}/>

								<input type="hidden" 
									name="owner" 
									value={owner}/>

								<input type="submit" 
									value="Spara"/>
							</form>
						</div>
				}
			</div>
		)
	}
}