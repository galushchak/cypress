import { BasePage } from './base.page';
import * as lang from '../../fixtures/langs.json';
import Chainable = Cypress.Chainable;

export class AcceptCookiesPopup extends BasePage {
    private readonly pageInternalName: string = 'COOKIES.PREFERENCES.POPUP';

    public constructor() {
        super();
    }

    public elements: any = {
        confirmPopUp: (): Chainable<JQuery<HTMLElement>> => cy.get('.dbsFrd'),
        declineAllBtn: (): Chainable<JQuery<HTMLElement>> => cy.get('button#W0wltc'),
        acceptAllBtn: (): Chainable<JQuery<HTMLElement>> => cy.get('button#L2AGLb'),
        languageChangeBtn: (): Chainable<JQuery<HTMLElement>> => cy.get('div.tn3Mmd>button'),
        languageListItem: (language: string): Chainable<JQuery<HTMLElement>> =>
            cy.get(`div.tn3Mmd li[data-hl="${language}"]`).first(),
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
