const create = require('../../utils/create');
const cd = require('../../globals/chdir').changeDirectory;
const webpack = require('./webpack/webpack').createWebpack;
const gulp = require('./gulp/gulp').createGulp;
const parcel = require('./parceljs/parcel').createParcelJS;
const {
	npm,
} = require('../../utils/npmCmds');

/**
 * Create an App project with no framework.
 * @function
 * @param {string} name - name of app.
 * @param {object} answers - Answers given.
 */
const createNoFrameWorkApp = (name, answers) => {
	return new Promise(async (resolve, reject) => {
		create.mkdir(name);
		cd(name);
		const templatePath = `${__dirname}`;
		create.makeFile('.gitignore');
		create.makeFile('README.md', {
			string: '{{ projectname }}',
			replaceString: name,
		});

		let app;
		switch (answers.AppBundler) {
			case 'Webpack':
				app = await webpack(name, templatePath, answers);
				break;
			case 'ParcelJS':
				app = await parcel(name, templatePath);
				break;
			case 'Gulp':
				app = await gulp(name, templatePath, answers);
				break;
			default:
				break;
		}

		resolve(app);
	});
};

/**
 * Create an Angular app.
 * @function
 * @param {string} name - name of app.
 */
const createAngular = async (name) => {
	await npm.install({
		command: 'npm install -g',
		packages: ['@angular/cli'],
		message: 'Installing Angular',
		messageComplete: 'Angular installed',
	});
	await npm({
		command: `ng new --style=sass --routing=true --interactive=false ${name.toLowerCase()}`,
		packages: [],
		message: 'Creating Angular app...',
		messageComplete: 'Done!',
	});
};

/**
 * Create a Vue app.
 * @function
 * @param {string} name - name of app.
 */
const createVue = async (name) => {
	await npm({
		command: 'npm install -g',
		packages: ['@vue/cli'],
		message: 'Installing Vue',
		messageComplete: 'Vue installed',
	});
	await npm({
		command: `vue create --preset ${__dirname}/vuepreset.json  ${name.toLowerCase()}`,
		packages: [],
		message: 'Creating Vue app...',
		messageComplete: 'Done!',
	});
};

/**
 * Create a React app.
 * @function
 * @param {string} name - name of app.
 */
const createReact = async (name) => {
	await npm({
		command: 'npm install -g',
		packages: ['create-react-app'],
		message: 'Installing React',
		messageComplete: 'React installed',
	});
	await npm({
		command: `npx create-react-app ${name.toLowerCase()}`,
		packages: [],
		message: 'Creating React app...',
		messageComplete: 'Done!',
	});
};

/**
 * Create a Svelte app.
 * @function
 * @param {string} name - name of app.
 */
const createSvelte = async (name) => {
	await npm({
		command: `npx degit sveltejs/template ${name}`,
		packages: [],
		message: 'Creating Svelte Project...',
		messageComplete: 'Svelte project done!',
	});

	cd(name);

	await npm({
		command: `npm install`,
		packages: [],
		message: 'Installing packages...',
		messageComplete: '',
	});
};

/**
 * Create an app project.
 * @function
 * @param {string} name - name of app.
 * @param {object} answers - Answers given.
 */
const createApp = (name, answers) => {
	return new Promise(async (resolve, reject) => {
		let app;
		switch (answers.appFramework) {
			case 'No, I dont need them':
				app = createNoFrameWorkApp(name, answers);
				break;
			case 'Angular':
				app = createAngular(name);
				break;
			case 'Vue':
				app = createVue(name);
				break;
			case 'React':
				app = createReact(name);
				break;
			case 'Svelte':
				app = createSvelte(name);
				break;
			default:
				return;
		}

		resolve(app);
	});
};

module.exports = {
	createApp,
};