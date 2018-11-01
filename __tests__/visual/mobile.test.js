import devices from 'puppeteer/DeviceDescriptors';
import { trimTrailingSlash } from '../utils';
import pages, { FULL_PAGE_SCREENSHOT, SCREENSHOTS_DIR } from './config';

describe('[Visual Regression] Mobile', () => {
	beforeAll(async () => {
		await page.emulate(devices['iPhone SE']);
	});

	it('compares screenshot of pages', async () => {
		for (let name in pages) {
			await page.goto(trimTrailingSlash(pages[name]), {
				waitUntil: 'networkidle0'
			});

			const image = await page.screenshot({
				fullPage: FULL_PAGE_SCREENSHOT
			});
			expect(image).toMatchImageSnapshot({
				customSnapshotsDir: SCREENSHOTS_DIR,
				customSnapshotIdentifier: `${name}-mobile`
			});
		}
	});
});
