const {
	spawn
} = require('child_process');
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

/**
 * Spawn a child process in command line to install packages.
 * @function
 * @param {string} cmd - The name of the command e.g. install or init.
 * @param {array} packages - An array of packages to install.
 */
const install = (cmd, packages) => {
	return new Promise(async (resolve, reject) => {
		let spinner = new Spinner(chalk.blue('installing packages...'))
		spinner.setSpinnerString(18);
		spinner.start();
		const child = await spawn(cmd, packages, {
			shell: true
		});

		child.on('close', () => {
			spinner.stop();
			process.stdout.write('\n');
			console.log(chalk.green.bgBlack('Installing packages completed.. ✓'));
			resolve();
		});

		child.on('error', (err) => {
			reject(err);
		});
	})
}

/**
 * Spawn a command line shell to use npm.
 * @function
 * @param {string} cmd - The name of the command e.g. install or init.
 * @param {string} message - Message to show 
 */
const run = (cmd, message) => {
	return new Promise(async (resolve, reject) => {
		let spinner = new Spinner(chalk.blue(message))
		spinner.setSpinnerString(18);
		spinner.start();
		let execChild = await spawn(cmd, [], {
			shell: true
		})

		execChild.on('close', () => {
			spinner.stop();
			resolve(execChild);
		});
	})
}

module.exports = {
	install,
	run
}