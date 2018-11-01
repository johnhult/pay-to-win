import * as contentfulPackage from 'contentful';

const API_SPACE_ID = '';
const API_KEY = '';
const contentful = contentfulPackage.createClient({
	space: API_SPACE_ID,
	accessToken: API_KEY
});

export default contentful;
