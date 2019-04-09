const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const createApp = require('../templates/app/app').createApp;
const createStack = require('../templates/stack/stack').createStack;
const createWebsite = require('../templates/website/website').createWebsite;
const Spinner = require('cli-spinner').Spinner;

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
            choices: ['App', 'App with NodeJS back-end', 'Website']
        },
        {
            type: 'list', 
            name: 'AppBundler', 
            message: 'Which bundler/task runner do you want to use', 
            choices: ['Webpack', 'ParcelJS', 'Gulp'],
            when: function(answers) {
                return answers.ProjectType === 'App'
            }
        },
        {
            type: 'list', 
            name: 'stack', 
            message: 'Do you want to use a stack?', 
            choices: ['MERN', 'MEAN', 'MEVN', 'No, I dont need them'],
            when: function(answers) {
                return answers.ProjectType === 'App with NodeJS back-end'
            }
        },
        {
            type: 'list', 
            name: 'website', 
            message: 'Which CMS do you want to use', 
            choices: ['Keystone', 'Apostrophe', 'Strapi', 'Netflify', 'No CMS needed'],
            when: function(answers) {
                return answers.ProjectType === 'Website'
            }
        },
        {
            type: 'list', 
            name: 'eslint', 
            message: 'Do you want to use ESLint?', 
            choices: ['Yes', 'No']
        },
        {
            type: 'list', 
            name: 'eslintType', 
            message: 'What do you want to use with ESlint?', 
            choices: ['ESLint alone', 'ESLint + Prettifier'],
            when: function(answers) {
                return answers.eslint === 'Yes'
            }
        }
    ]

    // Ask the questions and return the answers
    const answers = await inquirer.prompt(questions, processAnswers);
    buildProjects(answers, name);
}

// get default project structure
const getDefault = (args) => {
    console.log('default project');
}

const buildProjects = async (answers, name) => {
    let spinner;
    switch(answers.ProjectType) {
        case 'App':
            spinner = new Spinner('Creating app.. %s \n');
            spinner.setSpinnerString('|/-\\');
            await createApp(name, answers);
            break;
        case 'App with NodeJS back-end':
            await createStack(name);
            break;
        case 'Website':
            spinner = new Spinner('Creating website.. %s \n');            
            spinner.setSpinnerString('|/-\\');
            spinner.start();
            await createWebsite(name);
            spinner.stop();
            break;
    }
}

// returns the answers for questions
const processAnswers = (answers) => {
    return answers;
}
