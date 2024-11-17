declare namespace Cypress {
    // noinspection JSUnusedGlobalSymbols
    interface Chainable<Subject = any> {
        console(method: any): any
    }
}