const { spawn, exec } = require('child_process');
const chalk = require('chalk');

module.exports = {
  init: async function() {
      // spawn shell to execute command (shell: true for windows)
      const  cmd  = await spawn('npm', ['init', '-y'], {shell: true});

       // if it works show the data or init message
      cmd.stdout.on('data', (data) => {
        console.log(chalk.blue('creating: ') +  'package.json');
      });

      cmd.stderr.on('error', (error) => {
        console.error(`stderr: ${error}`);
      });
  },

  install: async function(packages, opts) {
		if(packages.length == 0 || !packages || !packages.length){return Promise.reject("No packages found")}
		if(typeof packages == "string") packages = [packages];
		if(!opts) opts = {};
		const cmdString = "npm install " + packages.join(" ") + " "
		+ (opts.global ? " -g":"")
		+ (opts.save   ? " --save":" --no-save")
		+ (opts.saveDev? " --save-dev":"")
		+ (opts.legacyBundling? " --legacy-bundling":"")
		+ (opts.noOptional? " --no-optional":"")
		+ (opts.ignoreScripts? " --ignore-scripts":"");

			const cmd = await spawn(cmdString, {shell: true});
      cmd.stdout.on('data', data => console.log(data));
      cmd.stderr.on('error', err => console.log(err));
	},

	uninstall: function(packages, opts){
		if(packages.length == 0 || !packages || !packages.length){return Promise.reject(new Error("No packages found"));}
		if(typeof packages == "string") packages = [packages];
		if(!opts) opts = {};
		const cmdString = "npm uninstall " + packages.join(" ") + " "
		+ (opts.global ? " -g":"")
		+ (opts.save   ? " --save":" --no-save")
		+ (opts.saveDev? " --saveDev":"");

		return new Promise(function(resolve, reject){
			const cmd = exec(cmdString, {cwd: opts.cwd?opts.cwd:"/"},(error, stdout, stderr) => {
				if (error) {
					reject(error);
				} else {
					resolve(true);
				}
			});

			if(opts.output) {
				const consoleOutput = function(msg) {
					console.log('npm: ' + msg);
				};

				cmd.stdout.on('data', consoleOutput);
				cmd.stderr.on('data', consoleOutput);
			}
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

// else {
//   const packages = args.slice(1, args.length -1);
//   packages.forEach(e => {
//     console.log(chalk.blue('installing: ') + `${e}` ); 
//   });
// }      