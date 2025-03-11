import Chainable = Cypress.Chainable;

export abstract class BasePage {
    protected defaultLanguage: string = 'lv-LV';

    protected constructor() {}

    protected typeText(element: Chainable<JQuery<HTMLElement>>, text: string): void {
        element.clear().type(text).type('{enter}');
    }
}
