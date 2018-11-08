const inquirer = require('inquirer');
const create = require('../utils/create');
const chalk = require('chalk');
const path = require('path');
const figlet = require('figlet');
const _npm = require('../utils/npmCmds');
const CURR_DIR = process.cwd();

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
    console.log(answers)

    // Create a folder with project name
    await create.mkdir(name);

    // cd into the project foler
    await changeDirectory(name);

    // execute npm init command inside project folder
    await _npm.execute(['init', '-y']);

}

// get default project structure
const getDefault = (args) => {
    console.log('default project');
}

// Change directory
const changeDirectory = (folder) => {
    try {
        process.chdir(`${folder}/`);
    }
    catch (err) {
        console.log('chdir: ' + err);
    }
}

// returns the answers for questions
const processAnswers = (answers) => {
    return answers;
}
