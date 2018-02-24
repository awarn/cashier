
import React from "react"
import WorkBarShare from "./WorkBarShare"

import s from "./style.scss"

export default class WorkBar extends React.Component {
	constructor() {
		super()

		this.state = {
			target: 150,
			workShares: [
				{
					name: "Linda",
					amount: 44.1	
				},
				{
					name: "Jim",
					amount: 67.13	
				},
				{
					name: "Ditt bidrag",
					amount: 78.33
				}
			]
		}
	}

	render() {
		let target = this.state.target
		let targetOverflow = target * 1.25

		let total = this.state.workShares.reduce((total, current) => {
			return total + current.amount
		}, 0)

		let shares = this.state.workShares.map((share, i) => {
			let args = {
				text: share.name,
				proportion: share.amount / total
			}
			
			return (
				<WorkBarShare key={`share-${i}`} args={args}/>
			)
		})

		return (
			<div className={s.wrapper}>
				<div className={s.bar}>
					<div className={s.total} style={{width: `${100 * total / target}%`}}>
						{shares}
					</div>
					<div className={s.targetMarker}>
						<span className={s.targetMarkerText}>{this.state.target}</span>
					</div>
				</div>
			</div>
		)
	}
}

