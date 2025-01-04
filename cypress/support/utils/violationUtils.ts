export interface Violation {
    id: string;
    impact: string;
    description: string;
    help: string;
    helpUrl: string;
    elements: string[];
}

export function logViolations(violations: any[]): void {
    if (violations.length > 0) {
        violations.forEach(violation => {
            cy.log(
                `${violation.id} - ${violation.impact.toUpperCase()}: ${violation.elements.map((element: any) => element).join(';')}`,
            );
        });
    }
}

export function highlightElements(violations: any[]): void {
    if (violations.length > 0) {
        violations.forEach((violation: { elements: any[] }) => {
            cy.window({ log: false }).scrollTo(0, 0, { log: false });

            const bodyRect = Cypress.$('body')[0].getBoundingClientRect();

            violation.elements
                .map((element: any) => {
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
                .filter((element: { x: number; y: number }) => element.x > 0 && element.y > 0)
                .forEach((element: { height: any; x: any; y: any; width: any }) => {
                    let highlightElement = document.createElement('div');

                    const highlightElementStyle = {
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderRadius: '5px',
                        boxSizing: 'border-box',
                        height: `${element.height}px`,
                        left: `${element.x}px`,
                        outline: '1px solid rgba(255, 0, 0, 0.2)',
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: `${element.y}px`,
                        width: `${element.width}px`,
                        zIndex: '9999',
                    };

                    Object.assign(highlightElement.style, highlightElementStyle);
                    Cypress.$('body').append(highlightElement);
                });
        });
    }
}
