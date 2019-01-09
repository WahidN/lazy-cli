const fs = require('fs');
const chalk = require('chalk');

module.exports = {

    // make directory
    mkdir: (name) => {
        if (!fs.existsSync(name)) { 
            console.log(chalk.blue('creating: ') + name);
            fs.mkdirSync(name) 
            return `${__dirname}/${name}`;
        }
        else { console.log('Folder already exists!')}     
    },

    // make file
    file: (path, content) => {
        try{
            console.log(chalk.blue('creating: ') +  path);
            fs.writeFileSync(path, content);
        }catch (e){
            console.log("Cannot write file ", e);
        }
    },

    copy: (file, path) => {
        try{
            console.log(chalk.blue('copying: ') +  file);
            fs.copyFile(file, path);
        }catch (e){
            console.log("Cannot write file ", e);
        }
    }
    
}