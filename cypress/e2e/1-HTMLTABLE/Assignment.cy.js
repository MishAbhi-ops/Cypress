/// <reference types="cypress" />

beforeEach(function () {
  cy.fixture("Assigndata").then((data) => {
    cy.log("Loaded data:", data);
    console.log("Loaded data:", data); // Add this line to see the output in the terminal/console
    // Add assertions to ensure data is loaded
    expect(data).to.have.property("username");
    expect(data).to.have.property("password");
    // Use the loaded data to perform login
    cy.login(data.username, data.password);
  });
});

describe("After Waiting and verification", () => {
  it("should wait for API response", function () {
    cy.visit("/");
    cy.get("#nameofuser").should("have.text", "");
    cy.get(".hrefch")
      .first()
      .then(($firstElement) => {
        // Do something with the first element
        cy.wrap($firstElement).click(); // Example action
      });
    cy.intercept("POST", "https://api.demoblaze.com/check").as("postData");
    cy.visit("https://demoblaze.com/prod.html?idp_=1");

    cy.wait("@postData").then((interception) => {
      // Assertions based on the interception response
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(".btn").then(($el) => {
      if ($el.length) {
        cy.wrap($el).contains(".btn", "Add to cart").click();
        cy.on("window:alert", (alertText) => {
          expect(alertText).to.equal("Product added.");
        });
      } else {
        // Element does not exist, handle accordingly
        cy.log("Element does not exist");
      }
    });
  });
});
