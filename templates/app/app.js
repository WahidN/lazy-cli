const _npm = require('../../utils/npmCmds');
const create = require('../../utils/create');
const cd = require('../../globals/chdir').changeDirectory;

exports.createApp = async (name, args) => {
    // Create a folder with project name
    create.mkdir(name);

    // cd into the project foler
    cd(name);

    const templatePath = `${__dirname}`;

    //create folders & files
        //folders
        create.mkdir('src/');
        create.mkdir('src/js');
        create.mkdir('src/js/models');
        create.mkdir('src/js/views');
        create.mkdir('src/scss');
        create.mkdir('dist/');
        create.mkdir('templates/');

        //files
        create.copyFile(`${templatePath}/package.json`, 'package.json', name);
        create.copyFile(`${templatePath}/webpack.settings.js`, 'webpack.settings.js', name);
        create.copyFile(`${templatePath}/webpack.prod.js`, 'webpack.prod.js');
        create.copyFile(`${templatePath}/webpack.dev.js`, 'webpack.dev.js');
        create.copyFile(`${templatePath}/webpack.common.js`, 'webpack.common.js');
        create.copyFile(`${templatePath}/index.html`, 'src/index.html', name);
        create.makeFile('src/scss/style.scss');
        create.makeFile('src/js/app.js');
        create.makeFile('src/js/config.js');
        create.makeFile('.gitignore');
        create.makeFile('README.md', name);

        let packages;

        packages = [
            'webpack',
            'webpack-cli',
            'webpack-dev-server',
            'webpack-merge',
            '@babel/cli',
            '@babel/core',
            '@babel/node',
            '@babel/preset-env',
            'babel-loader',
            'style-loader',
            'css-loader'
        ]

        // install packages
        _npm.command('npm install --save-dev', packages);

}