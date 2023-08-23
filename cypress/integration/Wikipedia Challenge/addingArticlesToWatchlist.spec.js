/// <reference types="cypress" />

describe("Adding Articles to the Watchlist", () => {
  before(() => {
    cy.fixture("wikipediaArticles").as("articles");
  });
  beforeEach(() => {
    cy.visit("/");
    cy.login("testEndpoint", "endpointChallenge");
  });
  it("E2E Test verifying adding and deleting of Articles to the watchlist", () => {
    cy.intercept("GET", "https://en.wikipedia.org/wiki/Cypress").as(
      "articleCypress"
    );
    cy.get("@articles").then((articles) => {
      //adding article 1

      cy.search(articles.article_1);
      cy.wait("@articleCypress").its("response.statusCode").should("eq", 200);
      cy.title().should("contain", articles.article_1);
      cy.addToWatchList();

      //adding article 2
      cy.search(articles.article_2);
      cy.url().should("contain", "Test_automation");
      cy.addToWatchList();
      //verifying articles are added
      cy.goToWatchlist();
      cy.numberOfArticlesIs(2);

      //Deleting Article Cypress
      cy.deleteArticle("Cypress");

      //Making sure that the second article is still present in the watchlist
      cy.goToWatchlist();
      cy.numberOfArticlesIs(1);
      cy.get('[for="ooui-php-1"]').should("contain", articles.article_2);

      //Goes to the article in the watchlist and makes sure that the title matches
      cy.goToArticle(articles.article_2);
      cy.title().should("contain", articles.article_2);
    });

    cy.goToWatchlist();
    cy.deleteArticle("Test automation");
    cy.logout();
  });

  /*
1. Add two pages to your watchlist
2. Removes one of the articles from your watchlist
3. Makes sure that the second article is still present in the watchlist
4. Goes to the article in the watchlist and makes sure that the title matches

*/
});
