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
            packages: ['@vue/cli'],
            message: 'Installing Vue',
            messageComplete: 'Vue installed',
        });
        const vue = await npm({
            command: `vue create --preset ${__dirname}/src/vuepreset.json  app`,
            packages: [],
            message: 'Creating Vue app...',
            messageComplete: 'Done!',
        });
        resolve(vue);
    });
};

/**
 * Create an MEAN app.
 * @function
 * @param {string} name - name of app.
 */
exports.createMEVN = async (name) => {
    return new Promise(async (resolve, reject) => {
        await setupNode(name);
        const app = await setupApp(name);

        resolve(app);
    });
};