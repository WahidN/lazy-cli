const _npm = require("../../utils/npmCmds");
const create = require("../../utils/create");
const cd = require("../../globals/chdir").changeDirectory;
const createNode = require("./nodeapp").createNoFrameWorkApp;

const setupNode = async name => {
    return new Promise(async (resolve, reject) => {
        create.mkdir("server");
        cd("server");

        const node = await createNode(name);
        resolve(node);
    });
};

const setupApp = async name => {
    return new Promise(async (resolve, reject) => {
        cd("..");
        create.mkdir("app");
        cd("app");
        await _npm.install("npm install -g", ["@angular/cli"]);
        const angular = await _npm.run(
            `ng new -style=sass --routing=true --interactive=false rapp`,
            `Installing Angular....`
        );
        resolve(angular);
    });
};

/**
 * Create an MEAN app.
 * @function
 * @param {string} name - name of app.
 */
exports.createMEAN = async name => {
    return new Promise(async (resolve, reject) => {
        await setupNode(name);
        const app = await setupApp(name);

        resolve(app);
    });
};