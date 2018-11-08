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

    await create.mkdir('src/');
    await create.mkdir('src/js');
    await create.mkdir('src/css');
    await create.mkdir('dist/');
}