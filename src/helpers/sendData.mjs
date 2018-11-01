/* eslint-disable no-undef */

export default async function sendData(endpoint, options) {
	const response = await fetch(endpoint, options);

	return response.json();
}
