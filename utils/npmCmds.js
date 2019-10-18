const {
	spawn,
} = require('child_process');
const chalk = require('chalk');
const {
	Spinner,
} = require('cli-spinner');

/**
 * Spawn a child process in command line to install packages.
 * @function
 * @param {string} cmd - The name of the command e.g. install or init.
 * @param {array} packages - An array of packages to install.
 */
const install = async (cmd, packages) => {
	const child = await spawn(cmd, packages, {
		shell: true,
	});
	return new Promise((resolve, reject) => {

		spinner.setSpinnerString(18);
		spinner.start();


		child.stdout.on('data', (data) => {
			console.log('\n');
			console.log(data.toString());
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
	});
};

/**
 * Spawn a child to use npm commands.
 * @function
 * @param {object} args - Arguments passed for options.
 */
const npm = async (args) => {
	const spinner = new Spinner(chalk.blue(args.message));
	spinner.start();
	const child = await spawn(args.command, args.packages, {
		shell: true,
	});
	return new Promise((resolve, reject) => {
		child.on('error', (err) => {
			reject(err);
		});
		child.stdout.on('data', (data) => {
			console.log('\n');
			console.log(data.toString());
		});
		child.on('close', () => {
			spinner.stop();
			process.stdout.write('\n');
			console.log(chalk.green.bgBlack(args.messageComplete));
			resolve(child);
		});
	});
};

module.exports = {
	npm,
};