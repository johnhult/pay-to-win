import styled from "styled-components";

import colors from "tokens/colors.mjs";

const CloseIconStyled = styled.div`
	position: relative;
	display: inline-block;
	width: 30px;
	height: 30px;
	overflow: hidden;
	transition: 0.2s;
	&:hover {
		&::before,
		&::after {
			background: darkturquoise;
		}
	}

	&::before,
	&::after {
		content: "";
		position: absolute;
		height: 4px;
		width: 100%;
		top: 50%;
		left: 0;
		margin-top: -2px;
		background: #000;
		border-radius: 5px;
	}
	&::before {
		transform: rotate(45deg);
	}
	&::after {
		transform: rotate(-45deg);
	}
`;

export default CloseIconStyled;
