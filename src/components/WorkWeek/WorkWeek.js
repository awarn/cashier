import React from "react";
import WorkPerformanceValue from "components/WorkPerformanceValue";

import s from "./WorkWeek.scss";

export default class WorkWeek extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: props.profile
		}
	}

	render() {
		const { profile } = this.state;

		return (
			<div className={s.workWeek}>
				<div className={s.label}>
					Totalt:
				</div>
				<div className={s.valueFrame}>
					{
						profile &&
							<WorkPerformanceValue url={`/user/work/totalThisWeek?user=${profile.name}`} unit="kr"/>
					}
				</div>
			</div>
		)
	}
}
