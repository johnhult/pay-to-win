export default function renderImagePreviews(files) {
	for (let i = 0, f; (f = files[i]); i++) {
		if (!f.type.match('image.*')) {
			continue;
		}

		const reader = new FileReader();

		reader.onload = (theFile => e => {
			let span = document.createElement('span');

			span.innerHTML = [
				'<img class="ImagePreview" src="',
				e.target.result,
				'" title="',
				escape(theFile.name),
				'"/>'
			].join('');

			document.querySelector('.ImagePreview-Area').insertBefore(span, null);
		})(f);

		reader.readAsDataURL(f);
	}
}
