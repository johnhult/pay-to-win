export default function prettifyDate(date) {
	const _date = new Date(date);

	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	};

	const fixedDate = _date.toLocaleDateString('en-US', options).toString();

	return fixedDate;
}
