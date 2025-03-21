import { requestType } from './enums';

export function requestLog(method: requestType | string, url: string, body?: any): void {
    cy.log(`Request:`);
    cy.log(` Method: ${method}`);
    cy.log(`    URL: ${url}`);
    cy.log(`   Body: ${body}`);
    cy.task('log', `Request:`);
    cy.task('log', ` Method: ${method}`);
    cy.task('log', `    URL: ${url}`);
    cy.task('log', `   Body: ${body}`);
}

export function responseLog(response: any): void {
    cy.log(`Response:`);
    cy.log(` Status: ${response.status}`);
    cy.task('log', `Response:`);
    cy.task('log', `  Status: ${response.status}`);
}
