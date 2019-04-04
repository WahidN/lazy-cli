const { spawn } = require('child_process');
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

const command = async (cmd, packages) => {
	let spinner = new Spinner(chalk.yellow('installing packages...'))
	spinner.setSpinnerString(18);
	spinner.start();
	let child = spawn(cmd, packages, {shell: true});

	await child.once('exit', () => {
		spinner.stop();
		process.stdout.write('\n');
  		console.log(chalk.black.bgGreen('Installing packages completed.. ✓'));
	});
}

module.exports = {
  command
}
    