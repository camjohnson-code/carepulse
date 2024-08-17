declare namespace Cypress {
  interface Chainable<Subject> {
    checkErrorMessage(id: string, message: string): Chainable<any>;
  }
}

Cypress.Commands.add(
  'fillForm',
  { prevSubject: false },
  (name, email, phone) => {
    cy.get('input[name="name"]').clear().type(name);
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[type="tel"]').clear().type(phone);
  }
);

Cypress.Commands.add('checkErrorMessage', (id, message) => {
  cy.get(`p[id="${id}"]`).should('exist').and('have.text', message);
});
