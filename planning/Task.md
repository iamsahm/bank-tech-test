# Bank tech test

Today, you'll practice doing a tech test.

For most tech tests, you'll essentially have unlimited time. This practice session is about producing the best code you can when there is a minimal time pressure.

You'll get to practice your OO design and TDD skills.

You'll work alone, and you'll also review your own code so you can practice reflecting on and improving your own work.

## Specification

### Requirements

-   You should be able to interact with your code via a REPL like IRB or Node. (You don't need to implement a command line interface that takes input from STDIN.)

*   command line interaction

-   Deposits, withdrawal.

    -   deposit

        -   amount DECIMAL
        -   date

    -   withdrawal
        -   amount DECIMAL
        -   date

-   Account statement (date, amount, balance) printing.

    -   statement
        -   returns history of date, amount, balance in list

-   Data can be kept in memory (it doesn't need to be stored to a database or anything).

-   To handle withdrawals that exceed the balance in the account, I'd like for you to handle them with an error message to the user.
-   And yes I think integrating a date with the withdrawals/deposits is useful for printing the statement, even if we don't need to implement historic changes at this stage

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

## design

### Bank account handler class

constructor:
balance DECIMAL
history [transaction obj]

deposit(amount, optional date)
adds amount to balance
updates history with transaction object, passing optional date if given

withdrawal(amount, optional date)
minuses amount from balance
updates history with transaction object, passing optional date if given

print statement
prints history with a header (date || credit || debit || balance)

#### edge cases:

-   deposit/withdraw non decimal values
-   deposit/withdraw zero value
-   withdrawing more than the deposited funds
-   inputting date to handle historic changes

#### testing cases:

-   deposit/withdraw decimal
-   deposit/withdraw zero
-   deposit/withdraw non-decimal value
-   withdrawing more than the account has
-   printing statement formats correctly
-   end to end test with mocked user input
    -   adds

### Transaction class

accepts optional date from deposit/withdrawal methods

constructor:
date DATE
credit DECIMAL
debit DECIMAL
balance DECIMAL

### REPL app

1.  prompt for deposit
    > amount
2.  prompt for next decision
    > deposit, withdrawal, statement
        returns statement, updates balance/history
    repeat

#### edge cases:

-   user types in something other than deposit, withdrawal, statement
-   user types in something in inconsistent case

#### testing cases:

-   user types in deposit
-   user types in withdrawal
-   user types in statement
-   user types in something else
