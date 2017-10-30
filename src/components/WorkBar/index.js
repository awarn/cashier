
import React from "react"

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

		let sections = this.state.workShares.map((share, i) => {
			let style = {
				width: `${100 * share.amount / total}%`
			}
			
			return (
				<div key={`share-${i}`} className={s.share} style={style}>{share.name}</div>
			)
		})

		return (
			<div className={s.wrapper}>
				<div className={s.bar}>
					<div className={s.total} style={{width: `${100 * total / target}%`}}>
						{sections}
					</div>
					<div className={s.targetMarker}>
						<span className={s.targetMarkerText}>{this.state.target}</span>
					</div>
				</div>
			</div>
		)
	}
}

