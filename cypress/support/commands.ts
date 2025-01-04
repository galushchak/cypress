import { Result } from 'axe-core';
import { highlightElements } from './utils/highlightElements';

interface Violation {
    id: string;
    impact: string;
    description: string;
    help: string;
    helpUrl: string;
    elements: string[];
}

Cypress.Commands.add('runAccessibilityChecks', () => {
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, (results: Result[]) => {
        let violations: Violation[] = new Array<Violation>();

        cy.task('log', 'Accessibility violation(-s):', { log: false });
        results.forEach(violation => {
            cy.log(
                `${violation.id} - ${violation.impact.toUpperCase()}: ${violation.nodes.map(node => node.target.toString()).join(';')}`,
            );
            violations.push({
                id: violation.id,
                impact: violation.impact,
                description: violation.description,
                help: violation.help,
                helpUrl: violation.helpUrl,
                elements: violation.nodes.map(node => node.target.toString()),
            });
        });

        highlightElements(violations);

        cy.task('log', JSON.parse(JSON.stringify(violations, null, 2)), { log: false });
    });
});
