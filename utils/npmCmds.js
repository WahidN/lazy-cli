const { spawn, exec } = require('child_process');
const chalk = require('chalk');

module.exports = {
  execute: async function(cmd, args, packages) {

	if(packages === null){packages = []};
      // spawn shell to execute command (shell: true for windows)
      const child = spawn('npm', [cmd, args, packages], {shell: true});

       // show message on command
      child.stdout.on('data', (data) => {
		  switch(cmd) {
			case 'init':
				console.log(chalk.blue('creating: ') +  'package.json');
				break;
			case 'install':
				console.log(data.toString())
				packages.forEach(e => {
					console.log(chalk.blue('installing: ') + `${e}` ); 
				});
			  	break;
		  }
      });

      child.stderr.on('error', (error) => {
        console.error(`stderr: ${error}`);
      });
  },

	list:function(path){
		let global = false;
		if(!path) global = true;
		const cmdString = "npm ls --depth=0 " + (global?"-g ":" ");
		return new Promise(function(resolve, reject){
			exec(cmdString, {cwd: path?path:"/"},(error, stdout, stderr) => {
				if(stderr !== ""){
					if (stderr.indexOf("missing")== -1 && stderr.indexOf("required") == -1) {
						return reject(error);
					}
				}
				let packages = [];
				packages = stdout.split('\n');
				packages = packages.filter(function(item){
					if(item.match(/^├──.+/g) != null){
						return true
					}
					if(item.match(/^└──.+/g) != null){
						return true
					}
					return undefined;
				});
				packages = packages.map(function(item){
					if(item.match(/^├──.+/g) != null){
						return item.replace(/^├──\s/g, "");
					}
					if(item.match(/^└──.+/g) != null){
						return item.replace(/^└──\s/g, "");
					}
				})
				resolve(packages);

			});
		});
	}
}
    