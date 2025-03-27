#!/usr/bin/env node
const { program } = require('commander');

async function runCLI() {
  const inquirer = await import('inquirer'); 
  const generateProject = require('../src/generateProject');

  if (!inquirer.default || typeof inquirer.default.prompt !== 'function') {
    console.error('❌ Inquirer is not properly loaded.');
    process.exit(1);
  }

  const answers = await inquirer.default.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:',
      default: 'express-api-kit',
    },
    {
      type: 'list',
      name: 'database',
      message: 'Select database:',
      choices: ['MongoDB', 'MySQL', 'PostgreSQL'],
    },
  ]);

  generateProject(answers.projectName, answers.database);
}

program.version('1.0.0').description('Express API Project Generator').action(runCLI);

program.parse(process.argv);
