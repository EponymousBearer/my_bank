#!/usr/bin/env node
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(chalk.bold("Welcome! Let's learn about your personality and name.\n"));

rl.question("Type 1 if you are a bit mysterious to others\nType 2 if you like to talk with anyone around you\nType 3 if you are the one who is hopeful and confident about the future!\nEnter your answer: ", (personalityChoice) => {
  if (personalityChoice === '1' || personalityChoice === '2' || personalityChoice === '3') {
    rl.question(chalk.yellow("What is your name? "), (name) => {
      let personality: string;

      switch (personalityChoice) {
        case "1":
          personality = "enigmatic";
          break;
        case "2":
          personality = "friendly";
          break;
        case "3":
          personality = "optimistic";
          break;
        default:
          personality = "unknown";
          break;
      }

      console.log(chalk.cyan(`\nHello, ${name}! You are ${personality}.`));
      rl.close();
    });
  } else {
    console.log(chalk.red("Invalid choice. Please enter 1, 2, or 3."));
    rl.close();
  }
});
