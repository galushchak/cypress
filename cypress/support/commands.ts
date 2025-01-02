import { Result } from 'axe-core';

Cypress.Commands.add('runAccessibilityChecks', () => {
    cy.injectAxe();
    cy.checkA11y(
        undefined,
        {
            runOnly: {
                type: 'tag',
                values: ['wcag21aa', 'wcag2a', 'wcag2aa', 'wcag21a', 'best-practice'],
            },
        },
        (violations: Result[]) => {
            cy.task('log', 'Accessibility violation(-s):');
            const logMsg = JSON.parse(
                JSON.stringify(
                    violations.map(violation => {
                        return {
                            id: violation.id,
                            impact: violation.impact,
                            description: violation.description,
                            help: violation.help,
                            helpUrl: violation.helpUrl,
                            nodes: violation.nodes.map(node => node.html),
                        };
                    }),
                    null,
                    2,
                ),
            );
            cy.log(logMsg);
            cy.task('log', logMsg);
        },
    );
});
