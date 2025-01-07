import { requestType } from './enums';

export function requestLog(method: requestType, url: string, body?: any) {
    cy.log(`Request:`);
    cy.log(` Method: ${method}`);
    cy.log(`    URL: ${url}`);
    cy.log(`   Body: ${body}`);
    cy.task('log', `Request:`);
    cy.task('log', ` Method: ${method}`);
    cy.task('log', `    URL: ${url}`);
    cy.task('log', `   Body: ${body}`);
}

export function responseLog(response: any) {
    cy.log(`Response:`);
    cy.log(` Status: ${response.status}`);
    cy.task('log', `Response:`);
    cy.task('log', `  Status: ${response.status}`);
}
