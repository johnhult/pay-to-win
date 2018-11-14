import React from "react";
import PropTypes from "prop-types";

import HighscoreListStyled from "./HighscoreListStyled";

class HighscoreList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const list = this.props.list.map((e, i) => {
			let playerPos = i + 1;
			let formattedScore;
			playerPos = playerPos.toString();
			playerPos = playerPos.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ");
			if (e.score) {
				formattedScore = e.score
					.toString()
					.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ");
			}
			return (
				<li key={i}>
					<span className="PlayerPosition">Rank {playerPos}</span>
					<div className="HighscoreListItem">
						{e.nickname && <span className="PlayerNickname">{e.nickname}</span>}
						{formattedScore && (
							<span className="PlayerScore">{formattedScore}</span>
						)}
					</div>
				</li>
			);
		});
		return (
			<HighscoreListStyled>
				<div className="ListHeaders">
					<h3>Nickname</h3>
					<h3>Score</h3>
				</div>
				<div className="ScrollWrapper">
					<ul>{list}</ul>
				</div>
			</HighscoreListStyled>
		);
	}
}

HighscoreList.propTypes = {
	/*
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.element
	]).isRequired,
	*/
	list: PropTypes.array
};

HighscoreList.defaultProps = {
	// target: '_self'
};

export default HighscoreList;
