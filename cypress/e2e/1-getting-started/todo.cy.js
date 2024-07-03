/// <reference types="cypress" />

describe('Html Table test', () => {
  beforeEach(function () {
    // Load the test data from the fixture and assign it to 'this.testData'
    cy.fixture('data').then((data) => {
      this.testData = data;
    });
    // Visit the URL
    cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
  });

  it('should insert data and verify the table', function () {
    //Clicking on the Table Data button
    cy.contains('summary', 'Table Data').click();

    // Insert data provided into input box
    cy.get('textarea[id="jsondata"]').then(($input) => {
      const data = JSON.stringify(this.testData);
      cy.wrap($input).clear().type(data, { parseSpecialCharSequences: false });
    });

  
    cy.contains('button', 'Refresh Table').click();

    // Wait for data table & rows to be populated and visible
    cy.get('#dynamictable tr').should('have.length.at.least', this.testData.length + 1);

    // Log the entire Data table structure for debugging the output
    cy.get('#dynamictable').invoke('html').then(html => {
      cy.log(`Table HTML: ${html}`);
    });

    cy.wrap(this.testData).should('not.be.undefined').then((testData) => {
      // Exclude the header row by ensuring we only iterate over the expected number of rows
      cy.get('#dynamictable tr').not(':first').each(($row, index) => {
        if (index < testData.length) {
          cy.wrap($row).invoke('html').then(rowHtml => {
            cy.log(`Row ${index} HTML: ${rowHtml}`);
          });

          // Waiting for the td elements to be present and visible
          cy.wrap($row).find('td').should('have.length', 3).and('be.visible').then($cells => {
            cy.wrap($cells).eq(0).should('contain', testData[index].name);
            cy.wrap($cells).eq(1).should('contain', testData[index].age);
            cy.wrap($cells).eq(2).should('contain', testData[index].gender);
          });
        }
      });
    });
  });
});
