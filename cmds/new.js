const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const createApp = require('../templates/app').createApp;

exports.newProject = async (name, args) => {

    // Header
    console.log(
        chalk.yellow(
          figlet.textSync('Lazy CLI', { horizontalLayout: 'full' })
        )
      );

    // Get default project structure
    if (args.default) {
        getDefault(args);
        return;
    }

    // questions
    const questions = [
        {
            type: 'list', 
            name: 'ProjectType', 
            message: 'What type of project do you want to set up?', 
            choices: ['App', 'Framework stack', 'Website (with CMS)']
        },
        {
            type: 'list', 
            name: 'App framework', 
            message: 'Do you want to use any of these frameworks?', 
            choices: ['Angular', 'React', 'Vue', 'No, I dont need them'],
            when: function(answers) {
                return answers.ProjectType === 'App'
            }
        } 
    ]

    // Ask the questions and return the answers
    const answers = await inquirer.prompt(questions, processAnswers);

    switch(answers.ProjectType) {
        case 'App':
            createApp(name);
            break;
        case 'Framework stack':
            console.log('create framework');
            break;
        case 'Website (with CMS)':
            console.log('create website');
            break;
    }
}

// get default project structure
const getDefault = (args) => {
    console.log('default project');
}



// returns the answers for questions
const processAnswers = (answers) => {
    return answers;
}
