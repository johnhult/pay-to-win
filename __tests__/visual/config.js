import path from 'path';

export const SCREENSHOTS_DIR = path.resolve(__dirname, 'screenshots');
export const FULL_PAGE_SCREENSHOT = true;

// TODO: URL should be environment specific (dotenv?)
const BASE_URL = 'http://localhost:8080/';

export default {
	LandingView: `${BASE_URL}/`
};
