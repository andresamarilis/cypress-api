
  /// <reference types="cypress" />

describe('Given the Users api', () => {
    context('When I send GET /usuarios', () => {
      it('Then it should return a list with all registered users', () => {
        cy.request({
          method: 'GET',
          url: 'https://serverest.dev/usuarios'
        })
          .should((response) => {
               // all your assertions should be placed here!!
            // code means that we expect the status code of the response to be equal to 200.
            expect(response.status).to.eq(200)
            expect(response.body.quantidade).to.eq(response.body.usuarios.length)
            Cypress._.each(response.body.usuarios, (usuario) => {
                // validates that the email from usuarios field should not be null...
              expect(usuario.email).to.not.be.null
               // We expect each object to have all the keys ('nome', 'email', 'password', 'administrador', '_id'):
              expect(usuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id')
              cy.log(JSON.stringify(response.body))
     
            })
          });
      });
    });
  
    context('When I send GET /usuarios passing id query param', () => {
      it('Then it should return only the filtered user', () => {
        cy.request({
          method: 'GET',
          url: '/usuarios',
          qs: {
            _id: '0uxuPY0cbmQhpEz1'
          }
        })
          .should((response) => {
            expect(response.status).to.eq(200)
             // we will send the same request as before, but this time passing a query string to filter only one user by _id:
            expect(response.body.usuarios[0].nome).to.eq("Fulano da Silva")
            cy.log(JSON.stringify(response.body))
     
          });
      });
    });
  });