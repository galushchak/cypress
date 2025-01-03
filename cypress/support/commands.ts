import { Result } from 'axe-core';

interface Violation { 
    id: string; 
    impact: string; 
    description: string; 
    help: string; 
    helpUrl: string; 
    elements: string[]; 
};

Cypress.Commands.add('runAccessibilityChecks', () => {
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, (violations: Result[]) => {
    
        let violationObj: Violation[] = new Array<Violation>();

        cy.task('log', 'Accessibility violation(-s):');

        violations.forEach(violation => {
            cy.log(
                `${violation.id} - ${violation.impact.toUpperCase()}: ${violation.nodes.map(node => node.target.toString()).join(';')}`,
            );
      
            violationObj.push({
                id: violation.id,
                impact: violation.impact,
                description: violation.description,
                help: violation.help,
                helpUrl: violation.helpUrl,
                elements: violation.nodes.map(node => node.target.toString()),
            });
        });

        cy.task('log', JSON.parse(JSON.stringify(violationObj, null, 2)), { log: false });
    });
});
