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
    fs.writeFileSync(path, content);
}

function copyFile(file, newFile, name) {
    let data = fs.readFileSync(file, 'utf-8');
    if (name !== undefined) {
        data = data.replace('{{ projectname }}', name.toLowerCase());
    }
    makeFile(newFile, data);
}

module.exports = {
    mkdir,
    makeFile,
    copyFile
}