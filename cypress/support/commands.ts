import { Result } from 'axe-core';
import { highlightElements, logViolations, Violation } from './utils/violationLogging';

Cypress.Commands.add('runAccessibilityChecks', () => {
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, (violations: Result[]) => {
        let violationArr: Violation[] = new Array<Violation>();

        cy.task('log', 'Accessibility violation(-s):', { log: false });

        violations.forEach(violation => {
            violationArr.push({
                id: violation.id,
                impact: violation.impact,
                description: violation.description,
                help: violation.help,
                helpUrl: violation.helpUrl,
                elements: violation.nodes.map(node => node.target.toString()),
            });
        });

        logViolations(violationArr);
        highlightElements(violationArr);

        cy.task('log', JSON.parse(JSON.stringify(violationArr, null, 2)), { log: false });
    });
});
