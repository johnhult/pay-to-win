import styled from "styled-components";

import fontSizes from "tokens/fontSizes.mjs";
import fontFamilies from "tokens/fontFamilies.mjs";
import spacing from "tokens/spacing.mjs";
import colors from "tokens/colors.mjs";

const ButtonStyled = styled.button`
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;

	width: 100%;
	display: block;
	height: 3rem;
	border: 0;
	font-weight: 600;

	font-size: 16px;
	font-family: monospace;
	color: ${colors.white};
	background-color: black;
	padding: 0 40px;
	cursor: pointer;
	transition: 0.2s;

	&:hover,
	&:focus {
		background-color: #404040;
	}

	&:disabled {
		cursor: not-allowed;
		border: 0;
		color: ${colors.gray1};
		background-color: black;
		transition: 0.2s;
	}
`;

export default ButtonStyled;
