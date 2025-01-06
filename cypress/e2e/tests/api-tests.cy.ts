context('GET /inventory', () => {
    const baseUrl = 'https://petstore.swagger.io/v2/store';

    it('gets a list of inventory', () => {
        cy.request('GET', `${baseUrl}/inventory`).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.SOLD).to.be.eq(1);
        });
    });
});
