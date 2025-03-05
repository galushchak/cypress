declare namespace Cypress {
    // noinspection JSUnusedGlobalSymbols
    interface Chainable<Subject = any> {
        runAccessibilityChecks(): void;
        apiRequest(method: string, url: string, body?: any): Chainable;
    }
}
