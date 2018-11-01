export default function getNewScreen(screenState, newScreen) {
	const screens = {};
	Object.entries(screenState).forEach(item => {
		screens[item[0]] = false;
	});
	screens[newScreen] = true;

	return screens;
}
