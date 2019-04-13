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
            "scripts": {},
            "license": "ISC",
            "devDependencies": {},
            "dependencies": {}
    }
}

exports.createGulp = (name, path, answers) => {
    create.makeFile('package.json', `${JSON.stringify(packageJson(name))}`);
    create.mkdir('src/');
    create.mkdir('src/js');
    create.mkdir('src/js/models');
    create.mkdir('src/js/views');
    create.mkdir('src/scss');
    create.mkdir('dist/');
    create.copyFile(`${path}/gulpfile.js`, 'gulpfile.js', {string: '{{ projectname }}', replaceString: name});
    create.copyFile(`${path}/index.html`, 'src/index.html', {string: '{{ projectname }}', replaceString: name});
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
     _npm.install('npm install --save-dev', packages);
}