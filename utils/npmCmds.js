const spawn = require('child_process').spawn;
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

module.exports = {
  install: function() {
	let spinner = new Spinner(chalk.yellow('installing packages...'))
	spinner.setSpinnerString(18);
	spinner.start();
	let child = spawn('npm install', {shell: true});
	child.on('exit', () => {
		spinner.stop();
		process.stdout.write('\n');
  		console.log(chalk.bgGreen('Installing packages completed.. ✓'));
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
    