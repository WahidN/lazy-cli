const {
	spawn,
} = require('child_process');
const chalk = require('chalk');
const {
	Spinner,
} = require('cli-spinner');

/**
 * Spawn a child to use npm commands.
 * @function
 * @param {object} args - Arguments passed for options.
 */
const npm = async (args) => {
	const spinner = new Spinner(chalk.blue(args.message));
	spinner.setSpinnerString(18);
	spinner.start();
	const child = await spawn(args.command, args.packages, {
		shell: true,
	});
	return new Promise((resolve, reject) => {
		child.on('error', (err) => {
			reject(err);
		});
		if (args.showData) {
			child.stdout.on('data', (data) => {
				console.log('\n');
				console.log(data.toString());
			});
		}
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