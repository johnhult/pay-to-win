const baseUrl = 'https://project.cloudfunctions.net';

export const endpointCreate = `${baseUrl}/create`;
export const endpointGet = `${baseUrl}/get`;
export const endpointUpdate = `${baseUrl}/update`;
export const endpointDelete = `${baseUrl}/delete`;

export const postOptions = body => {
	return {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		method: 'POST',
		body: JSON.stringify(body)
	};
};
