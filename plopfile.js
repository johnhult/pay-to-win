module.exports = function(plop) {
	plop.setGenerator('component', {
		description:
			'Create new component with component file, Styled Components file and Storybook version',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Component name?'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/index.jsx',
				templateFile: 'templates/Component.jsx'
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/{{pascalCase name}}Styled.jsx',
				templateFile: 'templates/ComponentStyled.jsx'
			},
			{
				type: 'add',
				path: 'stories/{{pascalCase name}}.stories.js',
				templateFile: 'templates/Component.stories.js'
			}
		]
	});

	plop.setGenerator('componentclass', {
		description:
			'Create new component with class (stateful) with component file, Styled Components file and Storybook version',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Component name?'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/index.jsx',
				templateFile: 'templates/ComponentWithClass.jsx'
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/{{pascalCase name}}Styled.jsx',
				templateFile: 'templates/ComponentWithClassStyled.jsx'
			},
			{
				type: 'add',
				path: 'stories/{{pascalCase name}}.stories.js',
				templateFile: 'templates/ComponentWithClass.stories.js'
			}
		]
	});

	plop.setGenerator('view', {
		description: 'Create new view',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'View name?'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/containers/{{pascalCase name}}/index.jsx',
				templateFile: 'templates/View.jsx'
			}
		]
	});

	plop.setGenerator('function', {
		description: 'Create new function with function file and a test',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Function name?'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/helpers/{{camelCase name}}.mjs',
				templateFile: 'templates/function.mjs'
			},
			{
				type: 'add',
				path: '__tests__/{{camelCase name}}.test.js',
				templateFile: 'templates/function.test.js'
			}
		]
	});

	plop.setGenerator('class', {
		description: 'Create new class with class file and a test',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Class name?'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/helpers/{{pascalCase name}}.js',
				templateFile: 'templates/Class.js'
			},
			{
				type: 'add',
				path: '__tests__/{{pascalCase name}}.test.js',
				templateFile: 'templates/Class.test.js'
			}
		]
	});

	plop.setGenerator('model', {
		description: 'Create new model',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Model name?'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/models/{{pascalCase name}}.mjs',
				templateFile: 'templates/Model.mjs'
			}
		]
	});
};
