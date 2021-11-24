/// <reference types="cypress" />

describe('Products api', () => {
    context('GET /produtos', () => {
        it('should return a list with all products', () => {
            cy.request({
                method: 'GET',
                url: 'https://serverest.dev/produtos'
            })
                .should((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.quantidade).to.eq(2)
                    expect(response.body.produtos.length).to.be.eq(2);
                    expect(response.body.produtos[0]).to.have.all.keys(
                      'nome', 'preco', 'descricao', 'quantidade', '_id'
                    )
                    cy.log(JSON.stringify(response.body))
                });
        });
    });
});


// method (String): GET,POST, PUT, DELETE. If no method is defined, Cypress uses the GET method by default. 
// url (String): The URL to make the request to.