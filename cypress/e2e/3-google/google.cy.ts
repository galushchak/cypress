import * as allure from 'allure-js-commons';
import 'cypress-axe';
import { AcceptCookiesPopup } from 'support/pages/acceptCookies.popup';
import { SearchPage } from 'support/pages/search.page';

describe('Google search test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('performs google search', () => {
        allure.description('This test performs search for some text.');
        allure.displayName('Test Search for text');
        allure.owner('Alex G');
        allure.tags('Google', 'Search');
        allure.severity('critical');
        allure.epic('Google');
        allure.feature('Essential features');
        allure.story('Sarch');
        allure.parentSuite('Tests for web search');
        allure.suite('Tests for essential features');
        allure.subSuite('Tests for search');
        allure.parameter('env', Cypress.env('baseUrl'));
        allure.parameter('time', new Date().toUTCString());

        const popup = new AcceptCookiesPopup();
        popup.confirmPopUpChecks();
        popup.changeLanguage('en-GB');
        popup.confirmPopUpChecks('en-GB');
        popup.elements.acceptAllBtn().click();

        const searchPage = new SearchPage();
        searchPage.searchForText('test');

        cy.get('cite').contains('https://en.wikipedia.org');
    });
});
