const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const createApp = require("../templates/app/app").createApp;
const createNodeApp = require("../templates/stack/stack").createNodeApp;
const createWebsite = require("../templates/website/website").createWebsite;

/**
 * Starts new project.
 * @function
 * @param {string} name - name of the project.
 * @param {string} args - arguments
 */
exports.newProject = async (name, args) => {
  // Header
  console.log(
    chalk.yellow(
      figlet.textSync("Lazy CLI", {
        horizontalLayout: "full"
      })
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
      type: "list",
      name: "ProjectType",
      message: "What type of project do you want to set up?",
      choices: ["App", "NodeJS App", "Website"]
    },
    {
      type: "list",
      name: "appFramework",
      message: "Do you want to use a framework?",
      choices: ["Angular", "React", "Vue", "No, I dont need them"],
      when: function(answers) {
        return answers.ProjectType === "App";
      }
    },
    {
      type: "list",
      name: "AppBundler",
      message: "Which bundler/task runner do you want to use",
      choices: ["Webpack", "ParcelJS", "Gulp"],
      when: function(answers) {
        return answers.appFramework === "No, I dont need them";
      }
    },
    {
      type: "list",
      name: "stack",
      message: "Do you want to use a stack?",
      choices: ["MERN", "MEAN", "MEVN", "No, I dont need them"],
      when: function(answers) {
        return answers.ProjectType === "NodeJS App";
      }
    },
    {
      type: "list",
      name: "websiteType",
      message: "How do you want to create a website?",
      choices: ["With Strapi", "With Netlify CMS", "With Craft CMS"],
      when: function(answers) {
        return answers.ProjectType === "Website";
      }
    },
    {
      type: "list",
      name: "websiteTemplate",
      message: "Which template engine would you like to use?",
      choices: ["Mustache", "Handelbars", "EJS", "Nunjucks", "None"],
      when: function(answers) {
        return answers.websiteType === "Static";
      }
    }
  ];

  // Ask the questions and return the answers
  const answers = await inquirer.prompt(questions, processAnswers);
  buildProjects(answers, name);
};

/**
 * Start project with default.
 * @function
 * @param {array} args - arguments
 */
const getDefault = args => {
  console.log("default project");
};

/**
 * Builds the project based on answers.
 * @function
 * @param {object} answers - Answers of users.
 * @param {string} name - name of project.
 */
const buildProjects = async (answers, name) => {
  switch (answers.ProjectType) {
    case "App":
      await createApp(name, answers);
      console.log(`\n`);
      console.log(chalk.yellow(`🎉  Successfully created project ${name}.`));
      console.log(chalk.yellow(`👉  cd ${name}`));
      console.log(`\n`);
      break;
    case "NodeJS App":
      await createNodeApp(name, answers);
      console.log(`\n`);
      console.log(chalk.yellow(`🎉  Successfully created project ${name}.`));
      console.log(chalk.yellow(`👉  cd ${name}`));
      console.log(`\n`);
      break;
    case "Website":
      await createWebsite(name, answers);
      break;
  }
};

// returns the answers for questions
const processAnswers = answers => {
  return answers;
};
