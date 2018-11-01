import faker from 'faker';

describe('[E2E] > LandingView', () => {
	// TODO: URL should be environment specific (dotenv?) `${process.env.BASE_URL}/`
	const URL = 'http://localhost:8080/';
	const TIMEOUT = 15000;

	beforeEach(async () => {
		await page.goto(URL);
	});

	it(
		'renders H1 correctly',
		async () => {
			const title = await page.$eval('h1', event => event.innerHTML);
			await expect(title).toBe('Landing View');
		},
		TIMEOUT
	);

	it(
		'handles form submission',
		async () => {
			const FORM_SELECTOR = 'form[name="user-form"]';
			const SUBMIT_SELECTOR = 'button[type="submit"]';
			const FEEDBACK_SELECTOR = '.form-feedback';

			// Fill the form
			await expect(page).toFillForm(FORM_SELECTOR, {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				password: faker.random.alphaNumeric(12)
			});

			// Submit
			const submitEl = await page.$(SUBMIT_SELECTOR);
			await submitEl.click();

			const feedbackEl = await page.$eval(FEEDBACK_SELECTOR, feedback => feedback.textContent);
			await expect(feedbackEl).toBe('Submitted');
		},
		TIMEOUT
	);
});
