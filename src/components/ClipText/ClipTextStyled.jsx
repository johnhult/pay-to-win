import styled from "styled-components";

import colors from "tokens/colors.mjs";

const ClipTextStyled = styled.div`
	width: 100%;
	position: relative;
	margin-bottom: 10px;
	span {
		width: 100%;
		text-align: center;
		font-size: 4em;
		font-weight: bold;
		line-height: 1;
		display: block;
		text-align: center;
	}
	span:first-child {
		background: url("assets/img/mario.gif") no-repeat;
		background-size: contain;
		background-position: -100% 0%;
		/* Color fallback */
		color: black;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: itsame infinite 10s linear;
		position: relative;
		z-index: 1;

		@keyframes itsame {
			0‰ {
				background-position: -100% 0%;
			}
			50% {
				background-position: 120% 0%;
			}
			100% {
				background-position: 200% 0%;
			}
		}
	}

	span:last-child {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		color: darkturquoise;
	}
`;

export default ClipTextStyled;
