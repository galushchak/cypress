import { NodeResult, Result } from 'axe-core';
import { highlightElements, logViolations } from './utils/violationLogging';
import { requestType } from './utils/enums';
import { requestLog, responseLog } from './utils/apiLogging';
import Chainable = Cypress.Chainable;
import Response = Cypress.Response;

Cypress.Commands.add('runAccessibilityChecks', (): void => {
    cy.injectAxe();
    cy.checkA11y(undefined, undefined, (violations: Result[]): void => {
        const violationArr: {
            id: string;
            impact: 'minor' | 'moderate' | 'serious' | 'critical' | null | undefined;
            description: string;
            help: string;
            helpUrl: string;
            elements: string[];
        }[] = violations.map((violation: Result): any => ({
            id: violation.id,
            impact: violation.impact,
            description: violation.description,
            help: violation.help,
            helpUrl: violation.helpUrl,
            elements: violation.nodes.map((node: NodeResult): any => node.target.toString()),
        }));

        logViolations(violationArr);
        highlightElements(violationArr);
    });
});

Cypress.Commands.add('apiRequest', (method: requestType | string, url: string, body?: any): Chainable<Response<any>> => {
    requestLog(method, url, body);
    return cy
        .request({
            method,
            url,
            body,
        })
        .then((response: Response<any>): Chainable<Response<any>> => {
            responseLog(response);
            return cy.wrap(response);
        });
});
