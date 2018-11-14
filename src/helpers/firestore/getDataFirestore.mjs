import db from "helpers/firestore/firestore";

export default async function getDataFirestore(query, order) {
	let collection = db.collection(query);
	if (order) {
		collection = collection.orderBy(order, "desc");
	}

	const entries = await collection
		.get()
		.then(entries => {
			let data = [];
			entries.forEach(e => data.push({ ...e.data(), selfRef: e.ref }));

			console.log(data);

			return data;
		})
		.catch(error => console.warn(error));

	return entries;
}
