import * as allure from 'allure-js-commons';
import 'cypress-axe';
import { AcceptCookiesPopup } from 'support/pages/acceptCookies.popup';
import { SearchPage } from 'support/pages/search.page';

describe('Google search test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('performs google search', () => {
        allure.description('This test attempts to log into the website.');
        allure.displayName('Test Authentication');
        allure.owner('John Doe');
        allure.tags('Web interface', 'Authentication');
        allure.severity('critical');
        allure.epic('Web interface');
        allure.feature('Essential features');
        allure.story('Authentication');
        allure.parentSuite('Tests for web interface');
        allure.suite('Tests for essential features');
        allure.subSuite('Tests for authentication');
        allure.parameter('env', Cypress.env('HOME_PAGE'));
        allure.parameter('time', new Date().toUTCString(), { excluded: true });

        const popup = new AcceptCookiesPopup();
        popup.confirmPopUpChecks();
        popup.changeLanguage('en-GB');
        popup.confirmPopUpChecks('en-GB');
        popup.elements.acceptAllBtn().click();
        // cy.runAccessibilityChecks();

        const searchPage = new SearchPage();
        searchPage.searchForText('test');

        cy.get('cite').contains('https://en.wikipedia.org'); //.as('testRes');
        // cy.get('@testRes').find('span').contains(' > wiki > Test');
    });
});
