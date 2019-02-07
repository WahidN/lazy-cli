const { spawnSync, exec } = require('child_process');
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

module.exports = {
  execute: function(cmd, args, packages) {
	if(packages === null){packages = []};
	switch(cmd) {
		case 'init':
			spinner = new Spinner('setting up project.. %s \n');            
			break;
		case 'install':
			spinner = new Spinner('installing packages.. %s \n'); 
			break;
	}
	spinner.setSpinnerString('|/-\\');
	spinner.start();
	// spawn shell to execute command (shell: true for windows)
	const child = spawnSync('npm', [cmd, args, packages], {shell: true});
	spinner.stop();
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
    