Project Overview
This project demonstrates the automation of a dynamic table on a web page using Cypress. The script performs the following steps:

Navigates to a specified URL.
Clicks a button to reveal an input field.
Inserts test data into the input field and refreshes the table.
Verifies that the data displayed in the table matches the input data.

**Technologies Used**

Cypress: End-to-end testing framework.
JavaScript: Programming language used for writing the test script.

**Test Data**

The test data is stored in a JSON file (data.json) located in the cypress/fixtures directory. This data is used for both inserting into the input field and verifying the table content.
Example Test Data (cypress/fixtures/data.json)

**Test File**
The test file is stored in a cy file (todo.cy.js) located in the cypress\e2e\1-HTMLTABLE\ directory
