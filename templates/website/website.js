const _npm = require('../../utils/npmCmds');
const create = require('../../utils/create');
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

exports.createWebsite = async (name, answers) => {
    // Create a folder with project name
    create.mkdir(name);

    // cd into the project foler
    cd(name);

    // execute npm init command inside project folder
    const templatePath = `${__dirname}/src`;
    create.makeFile("package.json", `${JSON.stringify(packageJson(name))}`);
    create.makeFile(".gitignore", "/node_modules");
    create.makeFile("README.md", {
        string: "{{ projectname }}",
        replaceString: name
    });

    await _npm.install("npm install", ['netlify-cli']);
    await _npm.run(`netlify init`, `Creating Netlify website....`);
}