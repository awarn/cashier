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

				<div className={s.label}>
					Förra veckan:
				</div>

				<div className={s.oneWeekAgo}>
					<div className={s.valueFrame}>
						{
							profile &&
								<WorkPerformanceValue url={`/user/work/totalLastWeek?user=${profile.name}`} unit="kr"/>
						}
					</div>

					<div className={s.comparisons}>
						<button className={s.comparisonValue}>
							Samma
							<i className="material-icons">face</i>
						</button>
						<button className={s.comparisonValue}>
							Totalt
							<i className="material-icons">star</i>
						</button>
					</div>
				</div>
			</div>
		)
	}
}
