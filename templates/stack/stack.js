const createNode = require('./nodeapp').createNoFrameWorkApp;
const createMEAN = require('./MEAN').createMEAN;
const createMERN = require('./MERN').createMERN;
const createMEVN = require('./MEVN').createMEVN;
const create = require("../../utils/create");
const cd = require('../../globals/chdir').changeDirectory;

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
 * Create an node app project.
 * @function
 * @param {string} name - name of app.
 * @param {object} answers - Answers given.
 */
exports.createNodeApp = async (name, answers) => {
    // Create a folder with project name
    create.mkdir(name);
    // cd into the project foler
    cd(name);
    const templatePath = `${__dirname}/src`;
    create.makeFile("package.json", `${JSON.stringify(packageJson(name))}`);
    create.makeFile(".gitignore", "/node_modules");
    create.makeFile("README.md", {
        string: "{{ projectname }}",
        replaceString: name
    });

    return new Promise(async (resolve, reject) => {
        let app;

        switch (answers.stack) {
            case 'No, I dont need them':
                app = createNode(name, answers, templatePath)
                break;
            case 'MEAN':
                app = createMEAN(name)
                break;
            case 'MEVN':
                app = createMEVN(name)
                break;
            case 'MERN':
                app = createMERN(name)
                break;
        }
        resolve(app);
    });
}