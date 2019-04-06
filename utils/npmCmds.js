const { spawn } = require('child_process');
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

const command = async (cmd, packages, fn) => {
	let spinner = new Spinner(chalk.yellow('installing packages...'))
	spinner.setSpinnerString(18);
	spinner.start();
	let child = await spawn(cmd, packages, {shell: true});

	child.on('error', (e) => {
		spinner.stop();
		console.log(chalk.black.bgRed(e));
	})

	await child.once('exit', () => {
		spinner.stop();
		process.stdout.write('\n');
		console.log(chalk.black.bgGreen('Installing packages completed.. ✓'));
	});

	typeof fn === 'function' && fn();

}

module.exports = {
  command
}
    