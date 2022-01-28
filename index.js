#!/usr/bin/env node
import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const title = chalkAnimation.rainbow(
        'Who wants to be a JavaScript Millionaire? 🤑 \n'
    );

    await sleep();
    title.stop();

    console.log(`
        ${chalk.cyan('How To Play')}
        I am a process on your computer.
        If you get any questions wrong, you ${chalk.red('LOSE!')}
        If you get all the questions right...
    `);
}

// top level await
await welcome();

// inquirer
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player'
        }
    });

    playerName = answers.player_name;
}

await askName();

// multiple choice questions
async function question0() {
    const answers = await inquirer.prompt({
        name: 'first_question',
        type: 'list',
        message: 'JavaScript was created in 10 days then released on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17th, 1995',
            'Wait what is Javascript again??'
        ],
    });

    return handleAnswer(answers.first_question == 'Dec 4th, 1995');
}
async function question1() {
    const answers = await inquirer.prompt({
        name: 'first_question',
        type: 'list',
        message: 'Inside which HTML element do we put the JavaScript?\n',
        choices: [
            '<javascript>',
            '<scripting>',
            '<script>',
            '<js>',
        ],
    });

    return handleAnswer(answers.first_question == '<script>');
}
async function question2() {
    const answers = await inquirer.prompt({
        name: 'first_question',
        type: 'list',
        message: 'Where is the correct place to insert a JavaScript?\n',
        choices: [
            'The <body> section',
            'Both the <head> and the <body> section are correct',
            'The <head> section',
        ],
    });

    return handleAnswer(answers.first_question == 'Both the <head> and the <body> section are correct');
}
async function question3() {
    const answers = await inquirer.prompt({
        name: 'first_question',
        type: 'list',
        message: 'What is the correct syntax for referring to an external script called "xyz.js"?\n',
        choices: [
            '<script name="xyz.js">',
            '<script href="xyz.js">',
            '<script src="xyz.js>"',
        ],
    });

    return handleAnswer(answers.first_question == '<script src="xyz.js>"');
}
async function question4() {
    const answers = await inquirer.prompt({
        name: 'first_question',
        type: 'list',
        message: 'How do you write "Hello World" in an alert box?\n',
        choices: [
            'msg("Hello, World");',
            'alert("Hello, World");',
            'alertBox("Hello, World");',
            'msgBox("Hello, World");'
        ],
    });

    return handleAnswer(answers.first_question == 'alert("Hello, World");');
}

await question0();
await question1();
await question2();
await question3();
await question4();

// loading spinner for answers
async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if(isCorrect) {
        spinner.success({ text: `Nice work ${playerName}`})
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}`});
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const message = `Congrats  ${playerName} 🎊🎊🎊\n  You  win  $ 1,000,000!!!`;

    figlet(message, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await winner();