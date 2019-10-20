const {
    createNode,
} = require('./nodeapp');
const {
    createMEAN,
} = require('./MEAN');
const {
    createMERN,
} = require('./MERN');
const {
    createMEVN,
} = require('./MEVN');
const create = require("../../utils/create");
const {
    changeDirectory,
} = require('../../globals/chdir');

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
    changeDirectory(name);

    return new Promise(async (resolve, reject) => {
        let app;

        switch (answers.stack) {
            case 'No, I dont need them':
                app = createNode(name, answers);
                break;
            case 'MEAN':
                app = createMEAN(name);
                break;
            case 'MEVN':
                app = createMEVN(name);
                break;
            case 'MERN':
                app = createMERN(name);
                break;
            default:
                break;
        }
        resolve(app);
    });
};