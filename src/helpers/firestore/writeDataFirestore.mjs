import db from "helpers/firestore/firestore";

export default async function writeDataFirestore(query, saveObject) {
	const collection = db.collection(query);

	const write = await collection
		.add(saveObject)
		.then(docRef => {
			return docRef.path;
		})
		.catch(error => console.warn(error));

	return write;
}
