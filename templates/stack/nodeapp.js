const {
    npm,
} = require("../../utils/npmCmds");
const create = require("../../utils/create");


const packageJson = (name) => {
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
        main: "app.js",
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

exports.createNode = (name, answers) => {
    return new Promise(async (resolve, reject) => {
        const templatePath = `${__dirname}/src`;
        create.makeFile("package.json", `${JSON.stringify(packageJson(name))}`);
        create.makeFile(".gitignore", "/node_modules");
        create.makeFile("README.md", {
            string: "{{ projectname }}",
            replaceString: name,
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

        const packagesToInstall = ["express", "mongodb", "mongoose", "body-parser", "ejs"];

        await npm({
            command: 'npm install',
            packages: packagesToInstall,
            message: 'Installing packages...',
            messageComplete: 'Installing packages complete!',
        });

        const endInstall = await npm({
            command: 'npm install nodemon --save-dev',
            packages: [],
            message: 'Installing nodemon...',
            messageComplete: 'Install complete!',
        });

        resolve(endInstall);
    });
};