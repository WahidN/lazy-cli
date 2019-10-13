const _npm = require("../../utils/npmCmds");
const create = require("../../utils/create");

/**
 * Create an node app project without framework.
 * @function
 * @param {string} name - name of app.
 * @param {object} answers - Answers given.
 */

exports.createNoFrameWorkApp = (name, answers, templatePath) => {
    return new Promise(async (resolve, reject) => {
        //reject(new Error("Something went wrong!"))

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

        const packages = ["express", "mongodb", "mongoose", "body-parser", "ejs"];

        await _npm.install("npm install", packages);

        const endInstall = await _npm.run("npm install nodemon --save-dev", 'Installing nodemon...');

        resolve(endInstall);
    });
};