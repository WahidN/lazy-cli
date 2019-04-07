const _npm = require('../../utils/npmCmds');
const create = require('../../utils/create');
const cd = require('../../globals/chdir').changeDirectory;

const createWebpack = (name, templatePath) => {
    create.copyFile(`${templatePath}/package.json`, 'package.json', name);
    create.mkdir('src/');
    create.copyFile(`${templatePath}/index.html`, 'src/index.html', name);
    create.makeFile('src/index.js', "require('./scss/style.scss'");
    create.mkdir('src/js');
    create.mkdir('src/js/models');
    create.mkdir('src/js/views');
    create.makeFile('src/js/config.js');
    create.mkdir('src/assets');
    create.mkdir('src/assets/img');
    create.mkdir('src/assets/fonts');
    create.mkdir('src/scss');
    create.makeFile('src/scss/style.scss');
    create.mkdir('dist/');
    create.makeFile('favicon.ico');
    create.copyFile(`${templatePath}/webpack.prod.js`, 'webpack.prod.js');
    create.copyFile(`${templatePath}/webpack.dev.js`, 'webpack.dev.js');
    create.copyFile(`${templatePath}/webpack.common.js`, 'webpack.common.js', name);
    create.copyFile(`${templatePath}/.eslintrc`, '.eslintrc');

    const packages = [
        'webpack',
        'webpack-cli',
        'webpack-dev-server',
        'webpack-merge',
        'workbox-webpack-plugin',
        'html-webpack-plugin',
        'clean-webpack-plugin',
        'webpack-pwa-manifest',
        'hard-source-webpack-plugin',
        'uglifyjs-webpack-plugin',
        'mini-css-extract-plugin',
        '@babel/cli',
        '@babel/core',
        '@babel/node',
        '@babel/preset-env',
        'babel-loader',
        'style-loader',
        'css-loader',
        'sass-loader',
        'node-sass',
        'eslint',
        'eslint-loader',
        'copy-webpack-plugin'
    ]
     // install packages
     _npm.command('npm install --save-dev', packages);
}

const createParcelJS = (name, path) => {

}

const createGulp = (name, path) => {
    create.copyFile(`${path}/package.json`, 'package.json', name);
    create.mkdir('src/');
    create.mkdir('src/js');
    create.mkdir('src/js/models');
    create.mkdir('src/js/views');
    create.mkdir('src/scss');
    create.mkdir('dist/');
    create.copyFile(`${path}/gulpfile.js`, 'gulpfile.js', name);
    create.copyFile(`${path}/index.html`, 'src/index.html', name);
    create.makeFile('src/scss/style.scss');
    create.makeFile('src/index.js');
    create.makeFile('src/js/config.js');


    const packages = [
        'gulp',
        'del',
        'gulp-sourcemaps',
        'gulp-plumber',
        'gulp-plumber',
        'gulp-sass',
        'gulp-autoprefixer',
        'gulp-cssnano',
        'gulp-babel',
        'gulp-uglify',
        'gulp-concat',
        'gulp-imagemin',
        'webpack-stream',
        'browser-sync'
    ]
     // install packages
     _npm.command('npm install --save-dev', packages);
}

exports.createApp = async (name, bundler) => {
    // Create a folder with project name
    create.mkdir(name);
    // cd into the project foler
    cd(name);
    const templatePath = `${__dirname}`;
    // "npm init"
    switch(bundler) {
        case 'Webpack':
            createWebpack(name, templatePath);
            break;
        case 'ParcelJS':
            createParcelJS(name, templatePath);
            break;
        case 'Gulp':
            createGulp(name, templatePath);
            break;
    }
    create.makeFile('.gitignore');
    create.makeFile('README.md', name);
}