const fs = require('fs');

module.exports = {

    // make directory
    mkdir: (name) => {
        if (!fs.existsSync(name)) { 
            fs.mkdirSync(name) 
            return `${__dirname}/${name}`;
        }
        else { console.log('Folder already exists!')}     
    },

    // make file
    file: (name) => {
        console.log(name)
    }
    
}