import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Customer {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  mobileNumber: string;
  bankAccount: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    mobileNumber: string,
    initialBalance: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.mobileNumber = mobileNumber;
    this.bankAccount = new BankAccount(initialBalance);
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log(chalk.red('Invalid deposit amount. Please enter a positive amount.'));
      return;
    }

    if (amount >= 100) {
      console.log(chalk.yellow('A $1 fee will be deducted from your deposit.'));
      amount -= 1;
    }

    this.bankAccount.credit(amount);
    console.log(chalk.green(`$${amount} deposited successfully. New balance: $${this.bankAccount.getBalance()}`));
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      console.log(chalk.red('Invalid withdrawal amount. Please enter a positive amount.'));
      return;
    }

    if (amount > this.bankAccount.getBalance()) {
      console.log(chalk.red('Insufficient balance. Withdrawal canceled.'));
      return;
    }

    this.bankAccount.debit(amount);
    console.log(chalk.green(`$${amount} withdrawn successfully. New balance: $${this.bankAccount.getBalance()}`));
  }

  checkBalance(): void {
    console.log(chalk.italic(`Account balance for ${this.getFullName()}: $${this.bankAccount.getBalance()}`));
  }
}

class BankAccount {
  balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  getBalance(): number {
    return this.balance;
  }

  credit(amount: number): void {
    this.balance += amount;
  }

  debit(amount: number): void {
    this.balance -= amount;
  }
}

console.log(chalk.bold('Welcome to MyBank CLI'));
console.log(chalk.bold('Enter customer details:'));

rl.question(chalk.cyan('First Name: '), (firstName) => {
  rl.question(chalk.cyan('Last Name: '), (lastName) => {
    rl.question(chalk.cyan('Age: '), (ageStr) => {
      const age = parseInt(ageStr);

      rl.question(chalk.cyan('Gender: '), (gender) => {
        rl.question(chalk.cyan('Mobile Number: '), (mobileNumber) => {
          rl.question(chalk.cyan('Initial Account Balance: $'), (initialBalanceStr) => {
            const initialBalance = parseFloat(initialBalanceStr);

            const customer = new Customer(
              firstName,
              lastName,
              age,
              gender,
              mobileNumber,
              initialBalance
            );

            console.log(chalk.green(`\nWelcome, ${customer.getFullName()}! Your account has been created.`));
            showMenu(customer);
          });
        });
      });
    });
  });
});

function showMenu(customer: Customer): void {
  console.log(chalk.yellowBright('\nMain Menu:'));
  console.log(chalk.yellow('1. Deposit'));
  console.log(chalk.yellow('2. Withdraw'));
  console.log(chalk.yellow('3. Check Balance'));
  console.log(chalk.yellow('4. Exit'));

  rl.question(chalk.cyan('Enter your choice: '), (choice) => {
    switch (choice) {
      case '1':
        rl.question(chalk.italic('Enter deposit amount: $'), (amountStr) => {
          const amount = parseFloat(amountStr);
          customer.deposit(amount);
          showMenu(customer);
        });
        break;
      case '2':
        rl.question(chalk.italic('Enter withdrawal amount: $'), (amountStr) => {
          const amount = parseFloat(amountStr);
          customer.withdraw(amount);
          showMenu(customer);
        });
        break;
      case '3':
        customer.checkBalance();
        showMenu(customer);
        break;
      case '4':
        console.log(chalk.yellow('Thank you for using MyBank CLI. Goodbye!'));
        rl.close();
        break;
      default:
        console.log(chalk.red('Invalid choice. Please enter a valid option.'));
        showMenu(customer);
        break;
    }
  });
}
