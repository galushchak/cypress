import { BasePage } from './base.page';

export class SearchPage extends BasePage {
    public constructor() {
        super();
    }

    public elements: any = {
        searchTextArea: () => cy.get('textarea.gLFyf'),
    };

    public searchForText(searchText: string): any {
        this.typeText(this.elements.searchTextArea(), searchText);
    }
}
