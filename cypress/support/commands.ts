declare namespace Cypress {
  interface Chainable<Subject> {
    checkErrorMessage(id: string, message: string): Chainable<any>;
    getCurrentFormattedDate(): Chainable<any>;
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

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date).replace(',', ' -');
};

Cypress.Commands.add('getCurrentFormattedDate', () => {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  return cy.wrap(formattedDate);
});
