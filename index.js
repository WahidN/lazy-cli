const program = require('commander');
const inquirer = require('inquirer');

module.exports = () => {
    program
        .command('help')
        .alias('h')
        .description('Show help menu')
        .action(() => {
            console.log('help');
        });

    program
        .command('new <name>')
        .alias('n')
        .description('Create new project')
        .option('-d, --default', 'Pass default values')
        .action((name, args) => {
            if (args.default) {
                console.log('default project');
            }
            const questions = [
                {type: 'list', name: 'ProjectType', message: 'What type of project do you want to set up?', choices: ['App', 'App with Node back-end', 'Website']}
            ]

            inquirer
                .prompt(questions)
                .then( (answers) => {
                    console.log(answers);
                })
        });

    
    program.parse(process.argv);
}
