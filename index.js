const program = require("commander");
const _new = require('./cmds/new');

module.exports = () => {
    program
        .version('1.0.1', '-v, --version');

    program
        .command('new <name>')
        .alias('n')
        .description('Create new project')
        .action((name, args) => { _new.newProject(name, args)});

    program.parse(process.argv);
}
