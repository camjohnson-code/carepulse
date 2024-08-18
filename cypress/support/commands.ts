declare namespace Cypress {
  interface Chainable<Subject> {
    checkErrorMessage(id: string, message: string): Chainable<any>;
  }
}

Cypress.Commands.add(
  'fillForm',
  { prevSubject: false },
  (name: string, email: string, phone: string) => {
    cy.get('input[name="name"]').clear({force: true}).type(name);
    cy.get('input[name="email"]').clear({force: true}).type(email);
    cy.get('input[type="tel"]').clear({force: true}).type(phone);
  }
);

Cypress.Commands.add('checkErrorMessage', (id, message) => {
  cy.get(`p[id="${id}"]`).should('exist').and('have.text', message);
});
