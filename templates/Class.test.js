// Derived from a formatUrl test
// This is obviously not going to do much in the below format
const SomeClass = require('helpers/Class');

test('Value should be last part of URL', () => {
	expect(SomeClass('http://www.somepage.com/something/something/', 'something')).toBe('something');
});
