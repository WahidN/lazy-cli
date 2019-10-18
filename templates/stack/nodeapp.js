const _npm = require("../../utils/npmCmds");
const create = require("../../utils/create");


const packageJson = name => {
    return {
        name: `${name.toLowerCase()}`,
        version: "1.0.0",
        keywords: [],
        homepage: "https://github.com/example-developer/example-project",
        browser: "/src/index.html",
        repository: {
            type: "git",
            url: "git+https://github.com/example-developer/example-project.git"
        },
        main: "index.js",
        scripts: {
            start: "nodemon app.js"
        },
        license: "ISC",
        devDependencies: {},
        dependencies: {}
    };
};

/**
 * Create an node app project without framework.
 * @function
 * @param {string} name - name of app.
 * @param {object} answers - Answers given.
 */

exports.createNoFrameWorkApp = (name, answers) => {
    return new Promise(async (resolve, reject) => {
        //reject(new Error("Something went wrong!"))
        const templatePath = `${__dirname}/src`;
        create.makeFile("package.json", `${JSON.stringify(packageJson(name))}`);
        create.makeFile(".gitignore", "/node_modules");
        create.makeFile("README.md", {
            string: "{{ projectname }}",
            replaceString: name
        });

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
};