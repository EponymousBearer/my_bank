import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Person {
  private name: string;
  private personality: string;

  constructor(name: string, personality: string) {
    this.name = name;
    this.personality = personality;
  }

  getType(): string {
    return this.personality;
  }
}

console.log(chalk.yellow('Welcome! Let\'s learn about your personality and name.\n'));

rl.question(chalk.cyan('What is your personality like? '), (personality) => {
  rl.question(chalk.cyan('What is your name? '), (name) => {
    const person = new Person(name, personality);

    switch (person.getType().toLowerCase()) {
      case 'mystery':
        console.log(chalk.magenta(`Hello, ${person.getType()}! You are an enigmatic individual.`));
        break;
      case 'friendly':
        console.log(chalk.green(`Hello, ${person.getType()}! You are a friendly person.`));
        break;
      case 'optimistic':
        console.log(chalk.blue(`Hello, ${person.getType()}! You have an optimistic personality.`));
        break;
      default:
        console.log(chalk.cyan(`Hello, ${person.getType()}! Nice to meet you.`));
        break;
    }

    rl.close();
  });
});
