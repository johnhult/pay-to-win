const DEBUG = ["debug", "dev", "development"].includes(process.env.NODE_ENV);

module.exports = {
	launch: {
		headless: !DEBUG,
		devtools: !DEBUG,
		slowMo: DEBUG ? 50 : 0
	}
};
