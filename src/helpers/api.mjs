const baseUrl = "https://us-central1-pay-to-win-be.cloudfunctions.net";

export const stripePayment = `${baseUrl}/payment`;

export const postOptions = body => {
	return {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
		method: "POST",
		body: JSON.stringify(body)
	};
};
