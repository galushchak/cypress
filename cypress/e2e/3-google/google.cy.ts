import * as allure from 'allure-js-commons';
import 'cypress-axe';

describe(
    'Google search test',
    {
        env: {
            HOME_PAGE: 'https://www.google.com',
            WIKI_PAGE: 'https://en.wikipedia.org',
        },
    },
    () => {
        beforeEach('Open main page and consent', () => {
            cy.visit(Cypress.env('HOME_PAGE'));
            cy.get('button#L2AGLb').click();
        });

        it('Should open Latvia Wiki page', () => {
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

            cy.get('textarea.gLFyf').type('Latvia{enter}');
            cy.get('div.DoxwDb>div.PZPZlf').contains('Latvija');
            cy.get('a[jsname="UWckNb"]').eq(0).click();

            cy.origin('en.wikipedia.org', () => {
                cy.url().then(url => {
                    cy.log('Current URL: ' + url);
                    expect(url).eq(Cypress.env('WIKI_PAGE') + '/wiki/Latvia');
                });
                cy.get('h1#firstHeading').contains('Latvia');
            });
            // cy.runAccessibilityChecks();
        });

        it('2+2 should equal to 4', () => {
            cy.get('textarea.gLFyf').type('2+2={enter}');
            cy.get('div.z7BZJb.XSNERd').contains('4');
            // cy.runAccessibilityChecks();
        });
    },
);
