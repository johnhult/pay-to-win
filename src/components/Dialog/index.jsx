import React from "react";
import PropTypes from "prop-types";
import Confetti from "react-dom-confetti";

import Button from "components/Button";
import CloseIcon from "components/CloseIcon";

import DialogStyled from "./DialogStyled";

const config = {
	angle: 90,
	spread: 155,
	startVelocity: 45,
	elementCount: 80,
	decay: 0.9
};

const Dialog = props => (
	<div
		className="DialogBg"
		style={
			"width:100%; height:100%; position:fixed; top:0; left:0; background-color:rgba(0,0,0,0.8); padding-top: 20%;"
		}
		onClick={props.toggleDialog}
	>
		<DialogStyled>
			<div className="Dialog-Inside">
				{props.confetti && (
					<div>
						<Confetti
							className="Confetti"
							active={props.confetti.w}
							config={config}
						/>
						<Confetti
							className="Confetti"
							active={props.confetti.a}
							config={{ ...config, angle: 180 }}
						/>
						<Confetti
							className="Confetti"
							active={props.confetti.s}
							config={{ ...config, angle: 270 }}
						/>
						<Confetti
							className="Confetti"
							active={props.confetti.d}
							config={{ ...config, angle: 0 }}
						/>
					</div>
				)}
				{props.children}
				<Button
					className="DialogButton"
					onClick={e => props.toggleDialog(e, true)}
				>
					{props.buttonText}
				</Button>
			</div>
		</DialogStyled>
	</div>
);

Dialog.propTypes = {
	confetti: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.number,
		PropTypes.node
	]).isRequired,
	buttonText: PropTypes.string,
	toggleDialog: PropTypes.func.isRequired
};

Dialog.defaultProps = {};

export default Dialog;
