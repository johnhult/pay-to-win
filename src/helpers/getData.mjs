/* eslint-disable no-undef */

export default async function getData(endpoint, options) {
	const response = await fetch(endpoint, options);

	const data = response;

	return data;
}
