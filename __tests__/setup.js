// Required for E2E tests: will allow use of jest-puppeteer helpers such as "toFillForm()"
import 'expect-puppeteer';

// Required for Visual Regression tests
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({
	toMatchImageSnapshot
});
