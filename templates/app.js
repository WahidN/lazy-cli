const _npm = require('../utils/npmCmds');
const create = require('../utils/create');
const cd = require('../globals/chdir').changeDirectory;

exports.createApp = async (name, args) => {
    // Create a folder with project name
    await create.mkdir(name);

    // cd into the project foler
    await cd(name);

    // execute npm init command inside project folder
    await _npm.execute(['init', '-y']);
    await _npm.execute(['install', 'webpack', 'webpack-dev-server', '--save-dev']);

    //create folders and files
        //src
        await create.mkdir('src/');
        await create.mkdir('src/js');
        await create.mkdir('src/js/models');
        await create.mkdir('src/js/views');
        await create.mkdir('src/scss');

        // dist
        await create.mkdir('dist/');

        //readme
        await create.file('index.js');
        await create.file('.gitignore');
        await create.file('webpack.config.js');
        await create.file('README.md', name);
}