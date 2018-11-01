// @ts-check

class SomeClass {
	constructor(value) {
		this.value = value;
	}

	static init() {
		// Initialization code
		this.privateFunction();
	}

	privateFunction() {
		// Code
	}
}

module.exports = SomeClass;
