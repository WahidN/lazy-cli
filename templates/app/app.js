const create = require('../../utils/create');
const cd = require('../../globals/chdir').changeDirectory;
const webpack = require('./webpack/webpack').createWebpack;
const gulp = require('./gulp/gulp').createGulp;
const parcel = require('./parceljs/parcel').createParcelJS;
const _npm = require('../../utils/npmCmds');

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
            replaceString: name
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
        }

        resolve(app)
    });
}

/**
 * Create an Angular app.
 * @function
 * @param {string} name - name of app.
 */
const createAngular = async (name) => {
    await _npm.install('npm install -g', ['@angular/cli']);
    await _npm.run(`ng new --style=sass --routing=true --interactive=false ${name.toLowerCase()}`, `Creating Angular app....`);
}

/**
 * Create a Vue app.
 * @function
 * @param {string} name - name of app.
 */
const createVue = async (name) => {
    await _npm.install('npm install -g', ['@vue/cli']);
    await _npm.run(`vue create --preset ${__dirname}/src/vuepreset.json  ${name.toLowerCase()}`, `Creating Vue app....`);
}

/**
 * Create a React app.
 * @function
 * @param {string} name - name of app.
 */
const createReact = async (name) => {
    await _npm.install('npm install -g', ['create-react-app']);
    await _npm.run(`npx create-react-app ${name.toLowerCase()}`, `Creating React app....`);
}


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
                app = createNoFrameWorkApp(name, answers)
                break;
            case 'Angular':
                app = createAngular(name)
                break;
            case 'Vue':
                app = createVue(name)
                break;
            case 'React':
                app = createReact(name)
                break;
        }

        resolve(app);
    });
}

module.exports = {
    createApp
}