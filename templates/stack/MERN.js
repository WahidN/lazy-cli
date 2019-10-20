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
            packages: ['create-react-app'],
            message: 'Installing Reacht',
            messageComplete: 'React installed',
        });
        const react = await npm({
            command: `npx create-react-app app`,
            packages: [],
            message: 'Creating React app...',
            messageComplete: 'Done!',
        });
        resolve(react);
    });
};

/**
 * Create an MEAN app.
 * @function
 * @param {string} name - name of app.
 */
exports.createMERN = async (name) => {
    return new Promise(async (resolve, reject) => {
        await setupNode(name);
        const app = await setupApp(name);

        resolve(app);
    });
};