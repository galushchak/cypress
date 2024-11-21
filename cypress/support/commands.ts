Cypress.Commands.add('runAccessibilityChecks', () => {
    cy.injectAxe();
    cy.checkA11y();
});