const fs = require('fs');
const chalk = require('chalk');

/**
 * Creates a folder.
 * @function
 * @param {string} name - name of the folder.
 * @returns folder
 */
function mkdir(name) {
    if (fs.existsSync(name)) console.log('Folder already exits!');

    console.log(chalk.blue('creating: ') + name);
    fs.mkdirSync(name);
    return `${__dirname}/${name}`;
}

/**
 * Creates a file.
 * @function
 * @param {string} path - path and name of file.
 * @param {string} content - content of file.
 */
function makeFile(path, content = '') {
    console.log(chalk.blue('creating: ') + path);
    fs.writeFileSync(path, content, 'utf8');
}

/**
 * Copies a file.
 * @function
 * @param {string} file - name of file to copy.
 * @param {string} newFile - path and name of new file.
 * @param {object} dataObject - replace content of new file.
 */
function copyFile(file, newFile, dataObject) {
    let data = fs.readFileSync(file, 'utf-8');
    if (dataObject !== undefined) {
        data = data.replace(dataObject.string, dataObject.replaceString.toLowerCase());
    }
    makeFile(newFile, data);
}

module.exports = {
    mkdir,
    makeFile,
    copyFile,
}