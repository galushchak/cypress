import { Result } from 'axe-core';
import { consoleLog, highlightElements, logViolations, Violation } from './utils/violationLogging';

Cypress.Commands.add('runAccessibilityChecks', () => {
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, (violations: Result[]) => {
        const violationArr: Violation[] = violations.map(violation => ({
            id: violation.id,
            impact: violation.impact,
            description: violation.description,
            help: violation.help,
            helpUrl: violation.helpUrl,
            elements: violation.nodes.map(node => node.target.toString()),
        }));

        logViolations(violationArr);
        highlightElements(violationArr);
        consoleLog(violationArr);
    });
});
