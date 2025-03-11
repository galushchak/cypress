import { requestType } from 'support/utils/enums';

context('GET /inventory', (): void => {
    const baseUrl = 'https://petstore.swagger.io/v2/store';

    it('gets a list of inventory', (): void => {
        cy.apiRequest(requestType.GET, `${baseUrl}/inventory`).then((response: any): void => {
            expect(response.status).to.eq(200);
            expect(response.body.sold).to.be.eq(57);
        });
    });
});
