import createImageUrl from '../src/helpers/createImageUrl.mjs';

test('Image URL should have HTTPS protocol – Strip http:', () => {
	expect(
		createImageUrl(
			'http://images.ctfassets.net/03re8i50nwsp/21ppNEfdRSeo4Egi0SKy8Q/dde8d7c6c7dd905b150caa83bde25c9b/test-2.JPG',
			'jpg',
			1024,
			30
		)
	).toBe(
		'https://images.ctfassets.net/03re8i50nwsp/21ppNEfdRSeo4Egi0SKy8Q/dde8d7c6c7dd905b150caa83bde25c9b/test-2.JPG?w=1024&fm=jpg&q=21'
	);
});

test('Image URL should have HTTPS protocol – Strip existing https:', () => {
	expect(
		createImageUrl(
			'https://images.ctfassets.net/03re8i50nwsp/21ppNEfdRSeo4Egi0SKy8Q/dde8d7c6c7dd905b150caa83bde25c9b/test-2.JPG',
			'jpg',
			1024,
			30
		)
	).toBe(
		'https://images.ctfassets.net/03re8i50nwsp/21ppNEfdRSeo4Egi0SKy8Q/dde8d7c6c7dd905b150caa83bde25c9b/test-2.JPG?w=1024&fm=jpg&q=21'
	);
});

/*
test("Image URL should have HTTPS protocol – Add https if protocolless", () => {
  expect(
    createImageUrl(
      "//images.ctfassets.net/03re8i50nwsp/21ppNEfdRSeo4Egi0SKy8Q/dde8d7c6c7dd905b150caa83bde25c9b/test-2.JPG",
      "jpg",
      1024,
      30
    )
  ).toBe(
    "https://images.ctfassets.net/03re8i50nwsp/21ppNEfdRSeo4Egi0SKy8Q/dde8d7c6c7dd905b150caa83bde25c9b/test-2.JPG?w=1024&fm=jpg&q=21"
  );
});

test('Image URL from non-Contentful domain should be returned as-is but with HTTPS protocol', () => {
	expect(createImageUrl('http://www.somedomain/someimage.jpg')).toBe(
		'https://www.somedomain/someimage.jpg'
	);
});
*/

test('Image URL from non-Contentful domain should be returned as-is with image dimension suffix', () => {
	expect(createImageUrl('http://www.somedomain/someimage.jpg', 'jpg', 768)).toBe(
		'www.somedomain/someimage_768.jpg'
	);
});
