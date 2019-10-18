const createNode = require('./nodeapp').createNoFrameWorkApp;
const createMEAN = require('./MEAN').createMEAN;
const createMERN = require('./MERN').createMERN;
const createMEVN = require('./MEVN').createMEVN;
const create = require("../../utils/create");
const cd = require('../../globals/chdir').changeDirectory;

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

    return new Promise(async (resolve, reject) => {
        let app;

        switch (answers.stack) {
            case 'No, I dont need them':
                app = createNode(name, answers)
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