const _npm = require('../../utils/npmCmds');
const create = require('../../utils/create');
const cd = require('../../globals/chdir').changeDirectory;

exports.createApp = async (name, args) => {
    // Create a folder with project name
    await create.mkdir(name);

    // cd into the project foler
    await cd(name);

    // execute npm init command inside project folder
    //await _npm.execute('init', '-y');

    // install dependencies
    

    //create folders & files
        //folders
        await create.mkdir('src/');
        await create.mkdir('src/js');
        await create.mkdir('src/js/models');
        await create.mkdir('src/js/views');
        await create.mkdir('src/scss');
        await create.mkdir('dist/');
        await create.file('src/scss/style.scss');

        //files
        await create.file('src/index.html');
        await create.file('src/js/app.js');
        await create.file('src/js/config.js');
        await create.file('.gitignore');
        await create.file('webpack.dev.js');
        await create.file('webpack.prod.js');
        await create.file('webpack.settings.js');
        await create.file('webpack.common.js');
        await create.file('config.env');
        await create.file('README.md', name);
}