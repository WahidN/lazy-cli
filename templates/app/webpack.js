const _npm = require('../../utils/npmCmds');
const create = require('../../utils/create');

const packageJson = (name) => {
    return {
        "name": `${name.toLowerCase()}`,
        "version": "1.0.0",
        "keywords": [],
        "homepage": "https://github.com/example-developer/example-project",
        "browser": "/src/index.html",
        "repository": {
            "type": "git",
            "url": "git+https://github.com/example-developer/example-project.git"
        },
            "main": "index.js",
            "scripts": {
            "dev": "webpack-dev-server --config webpack.dev.js",
            "build": "webpack --config webpack.prod.js"
            },
            "license": "ISC",
            "browserslist": {
                "production": [
                    "> 1%",
                    "last 2 versions",
                    "Firefox ESR"
                ],
                "legacyBrowsers": [
                    "> 1%",
                    "last 2 versions",
                    "Firefox ESR"
                ],
                "modernBrowsers": [
                    "last 2 Chrome versions",
                    "not Chrome < 60",
                    "last 2 Safari versions",
                    "not Safari < 10.1",
                    "last 2 iOS versions",
                    "not iOS < 10.3",
                    "last 2 Firefox versions",
                    "not Firefox < 54",
                    "last 2 Edge versions",
                    "not Edge < 15"
                ]
            },
            "devDependencies": {},
            "dependencies": {}
    }
}

exports.createWebpack = (name, templatePath, answers) => {
    return new Promise(async (resolve, reject) => {
        create.mkdir('src/');
        create.copyFile(`${templatePath}/index.html`, 'src/index.html', {string: '{{ projectname }}', replaceString: name});
        create.makeFile('src/index.js', "import './scss/style.scss';");
        create.mkdir('src/js');
        create.mkdir('src/js/models');
        create.mkdir('src/js/views');
        create.makeFile('src/js/config.js');
        create.mkdir('src/assets');
        create.mkdir('src/assets/img');
        create.makeFile('src/assets/img/favicon.ico');
        create.mkdir('src/assets/fonts');
        create.mkdir('src/scss');
        create.makeFile('src/scss/style.scss');
        create.mkdir('dist/');
        create.makeFile('package.json', `${JSON.stringify(packageJson(name))}`);
        // create.copyFile(`${templatePath}/package.json`, 'package.json', {string: '{{ projectname }}', replaceString: name});
    
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
            'copy-webpack-plugin',
            'optimize-css-assets-webpack-plugin',
            'critters-webpack-plugin',
            'compression-webpack-plugin',
            'brotli-webpack-plugin'
        ]
    
        let esLint;
    
        if (answers.eslint === 'Yes') {
            create.copyFile(`${templatePath}/.eslintrc`, '.eslintrc');
            packages.push('eslint');
            packages.push('eslint-loader');
    
            esLint = `{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['eslint-loader']
              },`
        } else {
            esLint = '';
        }
    
        create.copyFile(`${templatePath}/webpack.prod.js`, 'webpack.prod.js');
        create.copyFile(`${templatePath}/webpack.common.js`, 'webpack.common.js', {string: '{{ projectname }}', replaceString: name});
        create.copyFile(`${templatePath}/webpack.dev.js`, 'webpack.dev.js', {string: '{{ esLintString }}', replaceString: esLint});
        // install packages
        const npmInstall = await _npm.install('npm install --save-dev', packages);

        resolve(npmInstall);
    });
}