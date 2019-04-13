const { spawn } = require('child_process');
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

const install = (cmd, packages) => {
	return new Promise(async (resolve, reject) => {
		let spinner = new Spinner(chalk.blue('installing packages...'))
		spinner.setSpinnerString(18);
		spinner.start();
		const child = await spawn(cmd, packages, {shell: true});
	
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

const run = (cmd, message) => {
	return new Promise(async (resolve, reject) => {
		let spinner = new Spinner(chalk.blue(message))
		spinner.setSpinnerString(18);
		spinner.start();
		let execChild = await spawn(cmd, [], {shell: true})

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
    