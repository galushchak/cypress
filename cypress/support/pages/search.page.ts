import { BasePage } from './base.page';
import Chainable = Cypress.Chainable;

export class SearchPage extends BasePage {
    public constructor() {
        super();
    }

    public elements: any = {
        searchTextArea: (): Chainable<JQuery<HTMLElement>> => cy.get('textarea.gLFyf'),
    };

    public searchForText(searchText: string): void {
        this.typeText(this.elements.searchTextArea(), searchText);
    }
}
