// Derived from a formatUrl test
// This is obviously not going to do much in the below format
const someFunction = require('helpers/someFunction');

test('Value should be last part of URL', () => {
	expect(someFunction('http://www.somepage.com/something/something/', 'something')).toBe(
		'something'
	);
});
