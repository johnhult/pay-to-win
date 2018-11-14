import styled from "styled-components";

import breakpoints from "helpers/breakpoints.mjs";

const HighscoreListStyled = styled.div`
	color: white;
	margin: 0 auto;
	width: 100%;
	flex: 1;
	height: 300px;
	display: flex;
	flex-direction: column;

	.ListHeaders {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		margin: 0 auto;
		max-width: 600px;
		width: 100%;
		h3 {
			margin-bottom: 5px;
		}
	}
	.ScrollWrapper {
		width: 100%;
		max-width: 600px;
		overflow-y: auto;
		max-height: 300px;
		padding: 0 20px;
		margin: 0 auto;
		@media screen and (min-width: ${breakpoints.maxContainerWidth}) {
			max-height: initial;
			flex: 1;
		}
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		margin: 0 auto;
		max-width: 560px;
	}
	li {
		transition: 0.2s;
		padding: 10px 0;
		position: relative;
		border-bottom: 1px solid #4f4f4f;
		:first-child {
			color: gold;
			padding-top: 20px;
			position: relative;
			::before {
				content: "";
				background: url("/assets/img/crown.png");
				background-size: contain;
				display: block;
				width: 20px;
				height: 20px;
				position: absolute;
				top: 5px;
				left: -8px;
				transform: rotate(-15deg);
			}
		}
		:nth-child(2) {
			color: #d2d2d2;
		}
		:nth-child(3) {
			color: #caa977;
		}
	}

	.HighscoreListItem {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.PlayerPosition {
		display: block;
		font-family: monospace;
		text-align: left;
		width: 100%;
		color: #696969;
		padding-bottom: 5px;
		text-transform: uppercase;
	}
	.PlayerNickname {
		flex: 1;
		text-align: left;
		font-family: monospace;
		word-break: break-all;
	}
	.PlayerScore {
		margin-left: 10px;
		font-family: monospace;
	}
`;

export default HighscoreListStyled;
