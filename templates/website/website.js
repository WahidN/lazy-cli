const {
    npm,
} = require('../../utils/npmCmds');
const create = require('../../utils/create');
const cd = require('../../globals/chdir').changeDirectory;

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
        main: "index.js",
        scripts: {
            start: "nodemon app.js"
        },
        license: "ISC",
        devDependencies: {},
        dependencies: {},
    };
};

exports.createWebsite = async (name, answers) => {
    create.mkdir(name);
    cd(name);

    switch (answers.websiteType) {
        case 'Strapi':
            await npm({
                command: `npx create-strapi-app . --quickstart`,
                packages: [],
                message: 'Create Strapi website...',
                messageComplete: 'Done',
            });
            break;
        case 'NextJS':
            await npm({
                command: `npx create-next-app .`,
                packages: [],
                message: 'Create NextJS app...',
                messageComplete: 'Done',
            });
            break;
        case 'Gatsby':
            await npm({
                command: `npm install -g gatsby-cli`,
                packages: [],
                message: 'Installing Gatsby...',
                messageComplete: 'Done',
            });
            await npm({
                command: `gatsby new . https://github.com/gatsbyjs/gatsby-starter-hello-world`,
                packages: [],
                message: 'Creating Gatsby project...',
                messageComplete: 'Done',
            });
            break;
        case 'Keystone CMS':
            console.log('Not available yet!');
            break;
        default:
            console.error('Project doesnt exists!');
            break;
    }
};