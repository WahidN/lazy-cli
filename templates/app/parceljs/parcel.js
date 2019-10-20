const {
    npm,
} = require('../../../utils/npmCmds');
const create = require('../../../utils/create');

const packageJson = (projectName) => {
    return {
        "name": `${projectName.toLowerCase()}`,
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
            "dev": "parcel index.html --open",
            "build": "parcel build index.html"
        },
        "license": "ISC",
        "devDependencies": {},
        "dependencies": {}
    }
}

/**
 * Create a project with ParcelJS.
 * @function
 * @param {string} name - name of the project.
 * @param {string} path - path of the folder.
 */
exports.createParcelJS = (name, path) => {
    return new Promise(async (resolve, reject) => {
        create.makeFile('package.json', `${JSON.stringify(packageJson(name))}`);
        create.mkdir('src/');
        create.mkdir('src/js');
        create.mkdir('src/js/models');
        create.mkdir('src/js/views');
        create.mkdir('src/scss');
        create.mkdir('src/images');
        create.mkdir('src/views');
        create.copyFile(`${path}/parceljs/index.html`, 'index.html', {
            string: '{{ projectname }}',
            replaceString: name,
        });
        create.copyFile(`${path}/parceljs/main.js`, 'main.js');
        create.mkdir('dist/');
        create.makeFile('src/scss/styles.scss');
        create.makeFile('src/js/config.js');

        await npm({
            command: 'npm i -g parcel-bundler',
            packages: [],
            message: 'Installing ParcelJS',
            messageComplete: '',
        });

        const packagesToInstall = [
            'sass',
        ];
        // install packages
        const npmInstall = await npm({
            command: 'npm i --save-dev',
            packages: packagesToInstall,
            message: 'Installing packages',
            messageComplete: 'Installing packages completed!',
        });

        resolve(npmInstall);
    });
};