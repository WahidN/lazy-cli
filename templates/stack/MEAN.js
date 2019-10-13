const _npm = require('../../utils/npmCmds');

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
        "scripts": {},
        "license": "ISC",
        "devDependencies": {},
        "dependencies": {}
    }
}

const setupNode = () => {
    return new Promise(async (resolve, reject) => {
        //reject(new Error("Something went wrong!"))

        create.copyFile(`${templatePath}/app.js`, "app.js");
        create.mkdir("routes");
        create.mkdir("controllers");
        create.mkdir("models");
        create.mkdir("middleware");
        create.mkdir("views");
        create.mkdir("utils");
        create.mkdir("images");
        create.mkdir("public");
        create.mkdir("public/css");
        create.mkdir("public/js");

        const packages = ["express", "mongodb", "mongoose", "body-parser", "ejs"];

        await _npm.install("npm install", packages);

        const endInstall = await _npm.run("npm install nodemon --save-dev", 'Installing nodemon...');

        resolve(endInstall);
    });
}

const setupApp = () => {
    await _npm.install('npm install -g', ['@angular/cli']);
    await _npm.run(`ng new -style=sass --routing=true --interactive=false ${name.toLowerCase()}`, `Installing Angular....`);
}

/**
 * Create an MEAN app.
 * @function
 * @param {string} name - name of app.
 */
exports.createMEAN = async (name) => {
    return new Promise(async (resolve, reject) => {

        await setupNode();
        const app = await setupApp();

        resolve(app);
    });
}