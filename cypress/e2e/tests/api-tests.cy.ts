import { requestType } from 'support/utils/enums';

context('GET /inventory', () => {
    const baseUrl = 'https://petstore.swagger.io/v2/store';

    it('gets a list of inventory', () => {
        cy.apiRequest(requestType.GET, `${baseUrl}/inventory`).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.sold).to.be.eq(1);
        });
    });
});
