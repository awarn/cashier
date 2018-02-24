import React from "react";
import WorkPerformanceValue from "components/WorkPerformanceValue";

import s from "./workDay.scss";

export default class WorkDay extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: props.profile
		}
	}

	render() {
		const { profile } = this.state;

		return (
			<div className={s.workDay}>
				<div className={s.label}>
					Totalt:
				</div>
				<div className={s.valueFrame}>
					{
						profile &&
							<WorkPerformanceValue url={`/user/work/totalToday?user=${profile.name}`} unit="kr"/>
					}
				</div>
			</div>
		)
	}
}
