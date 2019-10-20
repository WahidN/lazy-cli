const {
    npm,
} = require('../../../utils/npmCmds');
const create = require('../../../utils/create');

/**
 * Object describing the pakcage.json file.
 * @Object
 * @param {string} name - name of the project.
 */
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

/**
 * Create a project with Gulp.
 * @function
 * @param {string} name - name of the project.
 * @param {string} path - path of the folder.
 * @param {object} answers - answers given.
 */
exports.createGulp = (name, path, answers) => {
    return new Promise(async (resolve, reject) => {
        create.makeFile('package.json', `${JSON.stringify(packageJson(name))}`);
        create.mkdir('src/');
        create.mkdir('src/js');
        create.mkdir('src/js/models');
        create.mkdir('src/js/views');
        create.mkdir('src/scss');
        create.mkdir('src/images');
        create.mkdir('src/views');
        create.copyFile(`${path}/gulp/index.html`, 'src/index.html', {
            string: '{{ projectname }}',
            replaceString: name,
        });
        create.mkdir('dist/');
        create.copyFile(`${path}/gulp/gulpfile.js`, 'gulpfile.js', {
            string: '{{ projectname }}',
            replaceString: name,
        });
        create.makeFile('src/scss/style.scss');
        create.makeFile('src/index.js');
        create.makeFile('src/js/config.js');


        const packagesToInstall = [
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
            'browser-sync',
            '@babel/core',
            '@babel/preset-env',
        ];
        // install packages
        const npmInstall = await npm.install({
            command: 'npm install --save-dev',
            packages: packagesToInstall,
            message: 'Installing packages...',
            messageComplete: 'Installing packages completed!',
        });

        resolve(npmInstall);
    });
};