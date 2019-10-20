const {
    npm,
} = require("../../utils/npmCmds");
const create = require("../../utils/create");
const cd = require("../../globals/chdir").changeDirectory;
const {
    createNode,
} = require("./nodeapp");

const setupNode = async (name) => {
    return new Promise(async (resolve, reject) => {
        create.mkdir("server");
        cd("server");

        const node = await createNode(name);
        resolve(node);
    });
};

const setupApp = async (name) => {
    return new Promise(async (resolve, reject) => {
        cd("..");
        await npm({
            command: 'npm install -g',
            packages: ['@angular/cli'],
            message: 'Installing Angular',
            messageComplete: 'Angular installed',
        });
        const angular = await npm({
            command: `ng new --style=sass --routing=true --interactive=false app`,
            packages: [],
            message: 'Creating Angular app...',
            messageComplete: 'Done!',
        });
        resolve(angular);
    });
};

/**
 * Create an MEAN app.
 * @function
 * @param {string} name - name of app.
 */
exports.createMEAN = async (name) => {
    return new Promise(async (resolve, reject) => {
        await setupNode(name);
        const app = await setupApp(name);

        resolve(app);
    });
};