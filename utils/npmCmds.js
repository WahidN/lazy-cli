const { spawn } = require('child_process');
const chalk = require('chalk');

module.exports = {
  execute: async function(args) {
    // spawn shell to execute command (shell: true for windows)
    const  child  = await spawn('npm', args, {shell: true});

    // if it works show the data or init message
    child.stdout.on('data', (data) => {
      if(args.includes('init')) {
        console.log(chalk.blue('creating: ') +  'package.json');
      }
    });
    child.stderr.on('error', (error) => {
      console.error(`stderr: ${error}`);
    });
  }
}
