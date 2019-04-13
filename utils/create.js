const fs = require('fs');
const chalk = require('chalk');

function mkdir(name) {
    if (!fs.existsSync(name)) { 
        console.log(chalk.blue('creating: ') + name);
        fs.mkdirSync(name) 
        return `${__dirname}/${name}`;
    }
    else { console.log('Folder already exists!')}   
}

function makeFile(path, content = '') {
    console.log(chalk.blue('creating: ') +  path);
    fs.writeFileSync(path, content, 'utf8');
}

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
    copyFile
}