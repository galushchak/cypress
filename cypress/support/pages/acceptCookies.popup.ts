import { BasePage } from './base.page';
import * as lang from '../../fixtures/langs.json';

export class AcceptCookiesPopup extends BasePage {
    private readonly pageInternalName: any  = 'COOKIES.PREFERENCES.POPUP';

    public constructor() {
        super();
    }

    public elements: any = {
        confirmPopUp: (): any => cy.get('.dbsFrd'),
        declineAllBtn: (): any => cy.get('button#W0wltc'),
        acceptAllBtn: (): any => cy.get('button#L2AGLb'),
        languageChangeBtn: (): any => cy.get('div.tn3Mmd>button'),
        languageListItem: (language: string): any => cy.get(`div.tn3Mmd li[data-hl="${language}"]`).first(),
    };

    public changeLanguage(language = 'lv-LV'): void {
        this.elements.languageChangeBtn().click();
        this.elements.languageListItem(language).click();
    }

    public confirmPopUpChecks(language: string = this.defaultLanguage): void {
        this.elements
            .confirmPopUp()
            .get('h1')
            .should('have.text', lang[this.pageInternalName].H1[`${language}`])
            .and('be.visible');
        this.elements
            .acceptAllBtn()
            .should('have.text', lang[this.pageInternalName]['ACCEPT.BUTTON'][`${language}`])
            .and('be.visible');
        this.elements
            .declineAllBtn()
            .should('have.text', lang[this.pageInternalName]['REJECT.BUTTON'][`${language}`])
            .and('be.visible');
    }
}
