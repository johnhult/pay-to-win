import styled from "styled-components";
import breakpoints from "helpers/breakpoints.mjs";

const WrapperStyled = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	min-height: 100%;
	background-color: #2f2f2f;
	@media screen and (min-width: ${breakpoints.maxContainerWidth}) {
		flex-direction: row;
		height: 100%;
	}
	.Score {
		flex: 1;
		padding: 40px 0;
		text-align: center;
		color: white;
		display: flex;
		flex-direction: column;
		@media screen and (min-width: ${breakpoints.maxContainerWidth}) {
			overflow: hidden;
		}

		.Padding {
			padding: 0 20px;
		}

		.MainHeader,
		.MainSubheader {
			margin: 0 auto 20px;
			max-width: 600px;
		}
	}
	.Pay {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
		overflow: auto;
		padding: 20px 10px;
		background-color: white;
		border-radius: 10px;
		margin: 10px auto;
		width: calc(100% - 20px);
		max-width: 500px;
		@media screen and (min-width: ${breakpoints.maxContainerWidth}) {
			padding: 20px;
			height: calc(100% - 80px);
			margin: 40px 40px 40px 0;
		}
	}
`;

const LoadingStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #2f2f2f;
	color: white;
	height: 100%;
	min-height: 100%;
`;

export { WrapperStyled, LoadingStyled };
