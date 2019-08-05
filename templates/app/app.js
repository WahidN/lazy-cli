const create = require('../../utils/create');
const cd = require('../../globals/chdir').changeDirectory;
const webpack = require('./webpack').createWebpack;
const gulp = require('./gulp').createGulp;
const parcel = require('./parcel').createParcelJS;
const _npm = require('../../utils/npmCmds');

const createNoFrameWorkApp = (name, answers) => {
    return new Promise(async (resolve, reject) => {
        // Create a folder with project name
        create.mkdir(name);
        // cd into the project foler
        cd(name);
        const templatePath = `${__dirname}/src`;
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

const createAngular = async (name) => {
    await _npm.install('npm install -g', ['@angular/cli']);
    await _npm.run(`ng new -style=sass --routing=true --interactive=false ${name.toLowerCase()}`, `Creating Angular app....`);
}

const createVue = async (name) => {
    await _npm.install('npm install -g', ['@vue/cli']);
    await _npm.run(`vue create --preset ${__dirname}/src/vuepreset.json  ${name.toLowerCase()}`, `Creating Vue app....`);
}

const createReact = async (name) => {
    await _npm.install('npm install -g', ['create-react-app']);
    await _npm.run(`npx create-react-app ${name.toLowerCase()}`, `Creating React app....`);
}

const createApp = (name, answers) => {
    switch(answers.appFramework) {
        case 'No, I dont need them':
            createNoFrameWorkApp(name, answers)
            break;
        case 'Angular':
            createAngular(name)
            break;
        case 'Vue':
            createVue(name)
            break;
        case 'React':
            createReact(name)
            break;
    }
}

module.exports = {
    createApp
}