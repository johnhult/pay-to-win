import styled from "styled-components";

import colors from "tokens/colors.mjs";

const CheckoutFormStyled = styled.div`
	width: 500px;
	max-width: 100%;

	.loading {
		position: relative;
		max-width: 50%;
		margin: 0 auto;

		::before,
		::after {
			content: "";
			display: block;
			background-color: #fed75a;
			border-radius: 0 0 50px 50px;
			height: 10px;
			width: 20px;
		}
		::before {
			transform-origin: 50% 100%;
			transform: rotate(135deg) translateY(100%);
			animation: eatTop infinite 1s;
		}
		::after {
			transform: rotate(45deg);
			transform-origin: 50% 0%;
			animation: eatBot infinite 1s;
		}
		@keyframes eatTop {
			0% {
				transform: rotate(135deg) translateY(100%);
			}
			50% {
				transform: rotate(180deg) translateY(100%);
			}
			100% {
				transform: rotate(135deg) translateY(100%);
			}
		}
		@keyframes eatBot {
			0% {
				transform: rotate(45deg);
			}
			50% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(45deg);
			}
		}
		.food {
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
			&:nth-child(1) {
				animation-delay: 0.4s;
			}
			&:nth-child(2) {
				animation-delay: 1.4s;
			}
			&:nth-child(3) {
				animation-delay: 2.4s;
			}
			::before {
				content: "";
				display: block;
				border-radius: 50px;
				background-color: #fed75a;
				width: 5px;
				height: 5px;
				margin-top: 8px;
			}
			animation: food infinite 3s 1s linear;
		}
		@keyframes food {
			0% {
				opacity: 0;
				transform: translateX(100%);
			}
			20% {
				opacity: 1;
			}
			90% {
				opacity: 1;
			}
			95% {
				opacity: 0;
			}
			100% {
				transform: translateX(0%);
			}
		}
	}

	form {
		width: 100%;
	}

	input,
	.StripeElement {
		border: 4px solid black;
		padding: 10px;
		outline: none;
		font-size: 16px;
		/* color: #424770; */
		color: black;
		letter-spacing: 0.025em;
		font-family: monospace;
		width: 100%;
		font-weight: 600;
		&::placeholder {
			color: #aab7c4;
		}
	}
	label {
		margin: 5px;
	}
	input:focus,
	.StripeElement--focus {
		background-color: black;
		color: white;
		&::placeholder {
			color: white;
		}
	}
	.Input--invalid,
	.StripeElement--invalid {
		border-color: mediumvioletred;
		color: mediumvioletred !important;
		&::placeholder {
			color: mediumvioletred !important;
		}
	}

	.StripeInRow {
		display: flex;
		width: 100%;
		label {
			width: 50%;
		}
	}

	.CheckoutSubheader {
		padding: 0 5px;
		font-weight: 900;
	}

	.AmountWrapper {
		margin: 20px 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		padding: 0 5px;
		align-items: flex-end;
		position: relative;
		.AmountPoints {
			width: 40%;
			flex: 1;
			margin: 0 0 5px 0;
		}
		.Equals {
			padding: 0 10px;
			flex-shrink: 1;
			margin: 0 0 17px 0;
		}
		.Money {
			overflow: auto;
			text-align: right;
			width: 40%;
			margin: 0 0 17px 0;
		}
	}
	.AmountInput {
		text-align: right;
		margin: 0;
		font-size: 2rem;
		appearance: textfield;
		border: none;
		border-bottom: 1px solid black;
	}
	.Amount--invalid {
		border-color: mediumvioletred;
		color: mediumvioletred;
		position: relative;
		:focus {
			color: mediumvioletred;
		}
	}
	.AmountError {
		padding: 0 5px;
		color: mediumvioletred;
		position: absolute;
		top: 100%;
		left: 0;
	}

	.SecureText {
		color: #a0a0a0;
		font-size: 14px;
		padding: 5px;
		display: block;
		text-align: center;
	}
`;

export default CheckoutFormStyled;
