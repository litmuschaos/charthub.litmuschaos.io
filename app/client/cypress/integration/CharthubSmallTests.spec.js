/// <reference types="Cypress" />

describe("Checking The Rechability Of Website", () => {
	it("Visiting the Website", () => {
		cy.visit("/");
	});
});

describe("Testing the functionality of Footer Links", () => {
	it("Visiting And Checking Footer Links", () => {
		cy.visit("/");
		cy.get("[data-cy=Footer] a").each(($div) => {
			let linkName = $div.text();
			cy.log("Clicking on " + linkName + " link");
			cy.wrap($div).click();
		});
	});
});

describe("Testing the SearchBar Functionality", () => {
	it("Selecting the SearchBar", () => {
		cy.visit("/");
		cy.log("Searching for SearchBar and typing on it");
		cy.get("[data-cy=SearchBar]")
			.click()
			.type("Pod Delete")
			.type("{Enter}");
		cy.get("[data-cy=SearchBar] input").should("have.value", "Pod Delete");
	});
});
