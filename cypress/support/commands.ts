import { Result } from 'axe-core';

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

        violationObj.forEach(violation => {
            cy.window({ log: false }).scrollTo(0, 0);
            const bodyRect = Cypress.$('body')[0].getBoundingClientRect();

            violation.elements
                .map(element => {
                    const el = Cypress.$(element)[0];
                    const rect = el != null ? el.getBoundingClientRect() : { x: 0, y: 0, width: 0, height: 0 };
                    return {
                        selector: element,
                        x: Math.max(rect.x - bodyRect.x, 0),
                        y: Math.max(rect.y - bodyRect.y, 0),
                        width: Math.max(rect.width, 0),
                        height: Math.max(rect.height, 0),
                    };
                })
                .filter(item => item.x > 0 && item.y > 0)
                .forEach(item => {
                    let newElement = document.createElement('div');
                    const highlightElementStyle = {
                        position: 'absolute',
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        width: `${item.width}px`,
                        height: `${item.height}px`,
                        outline: '1px dashed rgba(255, 0, 0, 0.5)',
                        backgroundColor: 'rgba(255, 0, 0, 0.3)',
                        zIndex: '9999',
                        pointerEvents: 'none',
                        boxSizing: 'border-box',
                        borderRadius: '5px',
                    };

                    Object.assign(newElement.style, highlightElementStyle);
                    Cypress.$('body').append(newElement);
                });
        });

        cy.task('log', JSON.parse(JSON.stringify(violationObj, null, 2)), { log: false });
    });
});
