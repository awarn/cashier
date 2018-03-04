import React from "react";
import WorkPerformanceValue from "components/WorkPerformanceValue";

import s from "./WorkWeek.scss";

export default class WorkWeek extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: props.profile,
			thisWeekView: "total",
			lastWeekView: "total"
		}
	}

	async setThisWeekView(view) {
		let ok = false;
		switch (view) {
			case "total":
				ok = true;
				break;
			case "projection":
				ok = true;
				break;
		}
		if (ok) {
			this.setState({
				thisWeekView: view
			})
		}	
	}

	async setLastWeekView(view) {
		let ok = false;
		switch (view) {
			case "total":
				ok = true;
				break;
			case "timepoint":
				ok = true;
				break;
		}
		if (ok) {
			this.setState({
				lastWeekView: view
			})
		}	
	}

	render() {
		const { profile, thisWeekView, lastWeekView } = this.state;

		return (
			<div className={s.workWeek}>

				<div className={s.thisWeek}>
					<div className={s.label}>
						Totalt:
					</div>

					<div className={s.valueFrame}>
						{
							profile && thisWeekView === "total" &&
								<WorkPerformanceValue url={`/user/work/totalThisWeek?user=${profile.name}`} unit="kr"/>
						}
						{
							profile && thisWeekView === "projection" &&
								<WorkPerformanceValue url={`/user/work/totalLastWeek?user=${profile.name}`} unit="kr"/>
						}
					</div>

					<div className={s.comparisons}>
						<div className="btn-group btn-group-toggle" data-toggle="buttons">
							<label 
								onClick={this.setThisWeekView.bind(this, "total")} 
								className={`btn btn-secondary ${thisWeekView === "total" ? "active" : ""}`}>
								<input defaultChecked
									type="radio" 
									name="thisWeekView" 
									autoComplete="off" />Totalt
							</label>

							<label 
								onClick={this.setThisWeekView.bind(this, "projection")} 
								className={`btn btn-secondary ${thisWeekView === "projection" ? "active" : ""}`}>
								<input 
									type="radio" 
									name="thisWeekView" 
									autoComplete="off" />Projektion
							</label>
						</div>
					</div>
				</div>

				<hr/>

				<div className={s.oneWeekAgo}>
					<div className={s.label}>
						Förra veckan:
					</div>

					<div className={s.valueFrame}>
						{
							profile && lastWeekView === "total" &&
								<WorkPerformanceValue url={`/user/work/totalLastWeek?user=${profile.name}`} unit="kr"/>
						}
						{
							profile && lastWeekView === "timepoint" &&
								<WorkPerformanceValue url={`/user/work/totalThisWeek?user=${profile.name}`} unit="kr"/>
						}
					</div>

					<div className={s.comparisons}>
						<div className="btn-group btn-group-toggle" data-toggle="buttons">
							<label 
								onClick={this.setLastWeekView.bind(this, "total")} 
								className={`btn btn-secondary ${lastWeekView === "total" ? "active" : ""}`}>
								<input defaultChecked
									type="radio" 
									name="lastWeekView" 
									autoComplete="off" />Totalt
							</label>

							<label 
								onClick={this.setLastWeekView.bind(this, "timepoint")} 
								className={`btn btn-secondary ${lastWeekView === "timepoint" ? "active" : ""}`}>
								<input 
									type="radio" 
									name="lastWeekView" 
									autoComplete="off" />Samma tid
							</label>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
