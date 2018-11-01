module.exports = {
	preset: "jest-puppeteer",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "mjs"],
	rootDir: "__tests__/",
	setupTestFrameworkScriptFile: "<rootDir>/setup.js",
	transform: {
		"^.+\\.jsx?$": "babel-jest",
		"^.+\\.tsx?$": "ts-jest"
	},
	testMatch: ["**/*.test.+(ts|tsx|js|jsx|mjs)"]
};
