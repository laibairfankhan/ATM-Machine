#! /usr/bin/env node
import inquirer from "inquirer";
//import chalk using for color:

import chalk, { chalkStderr } from "chalk";

//balance in my account:
let myBalance = Math.floor(Math.random() * 100000 + 1);
//my account pin code:
let pincode = 1234;
//starting message:
console.log(
  chalk.bold.blue.italic(
    "\n\t\tWellcome\t\n       to initiate a transaction!\t\n"
  )
);

//enter a atm card:
console.log(chalk.italic.yellow.bold("....To proceed, insert your card...."));

let pinCodeAnswer = await inquirer.prompt([
  {
    name: "pincode",
    type: "number",
    message: chalk.bold("enter your pin code"),
    transformer: (input: number) => {
      return chalk.italic.blue.bold(input.toString());
    },
  },
]);

//prompt the user to input  pin code:

if (pinCodeAnswer.pincode === pincode) {
  console.log(
    chalk.italic.bold.greenBright.bold("\n\tcorrect your pin code.\n")
  );

  //if condition is false must be run else:
} else {
  console.log(chalk.italic.red.bold("\n\tincorrect your pin code!!"));
  console.log(chalk.italic.cyan.bold("\n\tplease enter correct pin code.\n"));
}

// Prompt the user to select an operation (withdraw, check balance, fast cash,fund transfer, exit):
let operationAnswer = await inquirer.prompt([
  {
    name: "operations",
    message: chalk.bold("\nplease select options.\n"),
    type: "list",
    choices: [
      "withdraw",
      "check balance",
      "fast cash",
      "funds transfer",
      "change pin",
      "exit",
    ],
    transformer: (input: number) => {
      return chalk.italic.blue.bold(input.toString());
    },
  },
]);
// Perform the selected operation based on user input:
if (operationAnswer.operations === "withdraw") {
  // Prompt the user to enter the withdrawal amount:
  let amountAnswer = await inquirer.prompt([
    {
      name: "amount",
      type: "number",
      message: chalk.bold("enter your amount...."),
      transformer: (input: number) => {
        // Specify input type as number
        return chalk.italic.blue.bold(input.toString());
      },
    },
  ]);
  //apply condition :

  if (amountAnswer.amount > myBalance) {
    console.log(
      chalk.italic.red.bold(
        `\n\tSorry, Your amount is  insufficient for withdrawal from the account.\n`
      )
    );
  } else {
    myBalance -= amountAnswer.amount;
    console.log(
      chalk.italic.magenta.bold(
        `\n\tSuccessfuly withdrawal,your remaining balance is ${myBalance}\n`
      )
    );
  }
}
// Display the account balance:

if (operationAnswer.operations === "check balance") {
  console.log(
    chalk.italic.yellow.bold(`\n\tyou'r balance is ${myBalance}\t\n`)
  );

  // Prompt the user to select a fast cash option:
} else if (operationAnswer.operations === "fast cash") {
  let fastAmountAnswer = await inquirer.prompt([
    {
      name: "fastamount",
      message: chalk.bold("\nplease select option.\n"),
      type: "list",
      choices: ["2000", "5000", "10000", "20000"],
      transformer: (input: number) => {
        // Specify input type as number
        return chalk.italic.blue.bold(input.toString());
      },
    },
  ]);
  // check remaining balance:
  myBalance -= fastAmountAnswer.fastamount;
  console.log(
    chalk.italic.magenta.bold(`\n\tyour remaining balance is ${myBalance}\n`)
  );

  //depend user to change new code:
} else if (operationAnswer.operations === "change pin") {
  const newPinAnswer = await inquirer.prompt({
    name: "newPin",
    type: "number",
    message: chalk.bold("\nEnter your new digit pin code.\n"),
    transformer: (input: number) => chalk.italic.blue.bold(input.toString()),
  });

  // Store the new PIN in a variable
  const newPin = newPinAnswer.newPin;
  pinCodeAnswer.pin = newPin; // Update the pincode with the new PIN
  console.log(
    chalk.green.bold(
      "\n\tCongratulations, your PIN has been successfully changed!\n"
    )
  );

  //fund transfer:
} else if (operationAnswer.operations === "funds transfer") {
  let transferPersonCode = await inquirer.prompt([
    {
      name: "entercode",
      type: "number",
      message: chalk.bold(
        "\nKindly provide the recipient's account number, if you may."
      ),
    },
  ]);
  let moneyAnswer = await inquirer.prompt([
    {
      name: "money",
      type: "number",
      message: chalk.bold("\nEnter the amount you want to transfer"),
    },
  ]);
  let personalPinCode = await inquirer.prompt([
    {
      name: "yourpincode",
      type: "number",
      message: chalk.bold("\nenter your pin code"),
    },
  ]);

  //message print
  myBalance -= moneyAnswer.money;
  console.log(chalk.green.bold(`\n\tsuccessfuly transfer  your money\n`));
  console.log(chalk.magenta.bold(`\nyour remaining balance is ${myBalance}\n`));

  //exit to atm:
} else if (operationAnswer.operations === "exit") {
  console.log(chalk.bold.yellow("\nThank you for using the ATM machine.\n"));
  process.exit(0);
}
