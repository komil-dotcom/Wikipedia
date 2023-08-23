Cypress.Commands.add("login", (username, password) => {
  cy.get("li#pt-login").click({ force: true });
  cy.get("#wpName1").clear().type(username);
  cy.get('[placeholder="Enter your password"]').type(`${password}{enter}`);
});

Cypress.Commands.add("search", (articleName) => {
  cy.get('[placeholder="Search Wikipedia"]').type(`${articleName}{enter}`);
});

Cypress.Commands.add("addToWatchList", () => {
  cy.get("#ca-watch").click();
  cy.get("body").then(($body) => {
    if ($body.text().includes("Add to watchlist")) {
      cy.contains("button", "Watch").click();
    }
  });
});

Cypress.Commands.add("goToWatchlist", () => {
  cy.get(
    '[title="The list of pages you are monitoring for changes [ctrl-option-L]"]'
  ).click();
  cy.contains("Edit your list of watched pages").click();
});

Cypress.Commands.add("numberOfArticlesIs", (number) => {
  cy.get(
    '[class="oo-ui-layout oo-ui-labelElement oo-ui-fieldLayout oo-ui-fieldLayout-align-inline"]'
  ).should("have.length", number);
});

Cypress.Commands.add("deleteArticle", (name) => {
  cy.contains(
    '[class="oo-ui-layout oo-ui-labelElement oo-ui-fieldLayout oo-ui-fieldLayout-align-inline"]',
    name
  )
    .find("input[type=checkbox]")
    .click();
  cy.contains("button", "Remove titles").click();
});

Cypress.Commands.add("goToArticle", (name) => {
  cy.get(
    '[class="oo-ui-layout oo-ui-labelElement oo-ui-fieldLayout oo-ui-fieldLayout-align-inline"]'
  )
    .contains(name)
    .click();
});

Cypress.Commands.add("logout", () => {
  cy.get('[title="Log out"]').click();
});
