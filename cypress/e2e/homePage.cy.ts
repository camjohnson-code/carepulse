import { SELECTORS, MESSAGES } from '../support/constants';

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('sees the items on the page', () => {
    cy.get(SELECTORS.logo).should('exist');
    cy.get(SELECTORS.header).should('exist').and('have.text', MESSAGES.header);
    cy.get(SELECTORS.headerText).should('exist').and('have.text', MESSAGES.headerText);
    cy.get(SELECTORS.nameInput).should('exist').and('have.attr', 'placeholder', MESSAGES.namePlaceholder);
    cy.get(SELECTORS.emailInput).should('exist').and('have.attr', 'placeholder', MESSAGES.emailPlaceholder);
    cy.get(SELECTORS.phoneInput).should('exist').and('have.attr', 'placeholder', MESSAGES.phonePlaceholder);
    cy.get(SELECTORS.copyrightText).should('exist').and('have.text', MESSAGES.copyright);
    cy.get(SELECTORS.adminLink).should('exist').and('have.text', MESSAGES.adminLink);
    cy.get(SELECTORS.heroImage).should('exist');
  });

  it('submits the form', () => {
    cy.fillForm('John Doe', 'john@doe.com', '(123) 456-7890');
    cy.get(SELECTORS.submitButton)
      .click()
      .should('be.disabled')
      .and('have.text', MESSAGES.submitButtonLoading);
    cy.get(SELECTORS.loadingIcon).should('exist');
  });

  it('displays errors when the form is left empty', () => {
    cy.get(SELECTORS.submitButton).click();
    cy.checkErrorMessage(':R2j7qcq:-form-item-message', MESSAGES.nameError);
    cy.checkErrorMessage(':R3j7qcq:-form-item-message', MESSAGES.emailError);
    cy.checkErrorMessage(':R4j7qcq:-form-item-message', MESSAGES.phoneError);
    cy.get(SELECTORS.submitButton)
      .should('not.be.disabled')
      .and('have.text', MESSAGES.submitButtonDefault);
    cy.get(SELECTORS.loadingIcon).should('not.exist');
  });

  it('displays errors when the form is filled with invalid data', () => {
    cy.fillForm('J', 'john@', '123');
    cy.get(SELECTORS.submitButton).click();
    cy.checkErrorMessage(':R2j7qcq:-form-item-message', MESSAGES.nameError);
    cy.checkErrorMessage(':R3j7qcq:-form-item-message', MESSAGES.emailError);
    cy.checkErrorMessage(':R4j7qcq:-form-item-message', MESSAGES.phoneError);
    cy.get(SELECTORS.submitButton)
      .should('not.be.disabled')
      .and('have.text', MESSAGES.submitButtonDefault);
    cy.get(SELECTORS.loadingIcon).should('not.exist');
    cy.get(SELECTORS.nameInput).type('J'.repeat(50));
    cy.checkErrorMessage(':R2j7qcq:-form-item-message', MESSAGES.nameMaxError);
  });

  it('removes the error message when the input is valid', () => {
    cy.fillForm('J', 'john@', '123');
    cy.get(SELECTORS.submitButton).click();
    cy.checkErrorMessage(':R2j7qcq:-form-item-message', MESSAGES.nameError);
    cy.checkErrorMessage(':R3j7qcq:-form-item-message', MESSAGES.emailError);
    cy.checkErrorMessage(':R4j7qcq:-form-item-message', MESSAGES.phoneError);
    cy.fillForm('John Doe', 'john@doe.com', '11234567890');
    cy.get('p[id="\\:R2j7qcq\\:-form-item-message"]').should('not.exist');
    cy.get('p[id="\\:R3j7qcq\\:-form-item-message"]').should('not.exist');
    cy.get('p[id="\\:R4j7qcq\\:-form-item-message"]').should('not.exist');
  });
});