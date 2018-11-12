import styled from "styled-components";

import colors from "tokens/colors.mjs";
import fontSizes from "tokens/fontSizes.mjs";

import Box from "components/Box";

const DialogStyled = styled(Box)`
	width: 90%;
	max-width: 400px;
	margin: 0 auto;
	box-sizing: border-box;

	color: ${colors.black};
	background-color: ${colors.white};
	font-size: ${fontSizes.h2};
	text-align: center;
	position: relative;

	.Confetti {
		position: absolute;
		left: 50%;
	}
	.Dialog-Inside {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	.DialogButton {
		background-color: darkturquoise;
		width: 100%;
		height: 40px;
		padding: 5px;
	}
`;

export default DialogStyled;
