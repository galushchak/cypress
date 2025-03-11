export const logViolations: (violations: any[]) => void = (violations: any[]): void => {
    if (violations.length > 0) {
        violations.forEach((violation: any): any => {
            cy.log(
                `${violation.id} - ${violation.impact.toUpperCase()}: ${violation.elements.map((element: any): any => element).join(';')}`,
            );
        });
        cy.task('log', 'Accessibility violation(-s):', { log: false });
        cy.task('log', JSON.parse(JSON.stringify(violations, null, 2)), { log: false });
    }
};

const highlightStyle: (element: any) => any = (element: any): any => {
    return {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderRadius: '5px',
        boxSizing: 'border-box',
        height: `${element.height}px`,
        left: `${element.x}px`,
        outline: '2px dashed red',
        pointerEvents: 'none',
        position: 'absolute',
        top: `${element.y}px`,
        width: `${element.width}px`,
        zIndex: '9999',
    };
};

export const highlightElements: (violations: any[]) => void = (violations: any[]): void => {
    if (violations.length > 0) {
        violations.forEach((violation: { elements: any[] }): void => {
            cy.window({ log: false }).scrollTo(0, 0, { log: false });

            const bodyRect: DOMRect = Cypress.$('body')[0].getBoundingClientRect();

            violation.elements
                .map((element: any): any => {
                    const el: any = Cypress.$(element)[0];
                    const rect: any = el != null ? el.getBoundingClientRect() : { x: 0, y: 0, width: 0, height: 0 };

                    return {
                        x: Math.max(rect.x - bodyRect.x, 0),
                        y: Math.max(rect.y - bodyRect.y, 0),
                        width: Math.max(rect.width, 0),
                        height: Math.max(rect.height, 0),
                    };
                })
                .filter((element: any): any => element.width > 0 && element.height > 0)
                .forEach((element: any): any => {
                    const highlightElement: HTMLDivElement = document.createElement('div');
                    Object.assign(highlightElement.style, highlightStyle(element));
                    Cypress.$('body').append(highlightElement);
                });
        });
    }
};
