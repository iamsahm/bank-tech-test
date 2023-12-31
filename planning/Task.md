# Bank tech test

Today, you'll practice doing a tech test.

For most tech tests, you'll essentially have unlimited time. This practice session is about producing the best code you can when there is a minimal time pressure.

You'll get to practice your OO design and TDD skills.

You'll work alone, and you'll also review your own code so you can practice reflecting on and improving your own work.

## Specification

### Requirements

-   You should be able to interact with your code via a REPL like IRB or Node. (You don't need to implement a command line interface that takes input from STDIN.)

```
-   Deposits, withdrawal.

    -   deposit

        -   amount DECIMAL
        -   ~~date DATE~~

    -   withdrawal
        -   amount DECIMAL
        -   date DATE

* update: deposit and withdrawal can happen in the same method

-   Account statement (date, amount, balance) printing.

    -   statement
        -   returns history of date, amount, balance in list

* update: moved this to separate class

-   Data can be kept in memory (it doesn't need to be stored to a database or anything).

-   To handle withdrawals that exceed the balance in the account, I'd like for you to handle them with an error message to the user.

-   And yes I think integrating a date with the withdrawals/deposits is useful for printing the statement, even if we don't need to implement historic changes at this stage

-   Just pence/cents to two decimal places I'd say, anything more than that should return an error
    (ref questioning the input of fractions of pennies)
```

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2023  
**And** a deposit of 2000 on 13-01-2023  
**And** a withdrawal of 500 on 14-01-2023  
**When** she prints her bank statement  
**Then** she would see

```
date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00
```

## Self-assessment

Once you have completed the challenge and feel happy with your solution, here's a form to help you reflect on the quality of your code: https://docs.google.com/forms/d/1Q-NnqVObbGLDHxlvbUfeAC7yBCf3eCjTmz6GOqC9Aeo/edit

## do these things

1. Have instructions on how to install your code
2. Have instructions on how to run your code
3. Have instructions on how to run your tests
4. Include tests that all pass when you run them
5. Have code that satisfies the requirements
6. Follow Single Responsibility Principle
7. Have git commits that show a clear process

---

## Design

### Account handler class

Constructor:

-   balance DECIMAL
-   history [transaction obj]

changeBalance(amount)
if balance + amount < 0 throw error
else balance += amount
update history with transaction object, passing optional date if given

print statement
prints history with a header (date || credit || debit || balance)

#### edge cases:

-   deposit/withdraw non decimal values
-   deposit/withdraw zero value
-   withdrawing more than the deposited funds
-   ~~inputting date to handle historic changes~~

#### testing cases:

-   deposit/withdraw decimal
-   deposit/withdraw zero
-   deposit/withdraw fractions of a penny throws error
-   deposit/withdraw non-decimal value
-   withdrawing more than the account has
-   printing statement formats correctly

### Transaction class

constructor:
date DATE
credit NUMBER
debit NUMBER
balance NUMBER

## updates

-   You might not need to manage a specific attribute for the balance, because you can recalculate the current balance by "replaying" the list of transactions from the initial state to this point. This simplifies the code and avoids duplication of information (having the balance both as a numeric variable and has an "aggregate" of all the transactions), which can potentially cause errors and inconsistent state, e.g by having the list of transactions and balance out of sync.
    -   calculate the balance by iterating through the transactions and adding the credit and subtracting the debit 
        * added and refactored tests
-   In our tests, we try to control non-deterministic values which includes time. I recommend refactoring your tests to use frozen dates rather than today's date, which will also allow you to test the acceptance criteria has been met (reverse chronological order of transactions across multiple dates).
-   In your statement printer, you take the transaction history as an argument in the constructor. This means that if the user wishes to print their statement a second time, they would need to make a new instance of the statement printer. If you pass this argument straight to the printer function inside the statement printer instead, the instance can be re-used.
