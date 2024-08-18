describe('Success Page', () => {
  beforeEach(() => {
    cy.visit(
      'localhost:3000/patients/66c0cf890036ebdc0dcb/new-appointment/success?appointmentId=66c17f77002cb9bd9d3e'
    );
  });

  it('should display success message', () => {
    cy.get('img[alt="CarePulse logo"]').should('be.visible');
    cy.get('img[alt="Success icon"]').should('be.visible');
    cy.get('h2').should(
      'have.text',
      'Your appointment request has been successfully submitted!'
    );
    cy.get('p')
      .first()
      .should('have.text', "We'll be in touch shortly to confirm.");
    cy.get('p').eq(1).should('have.text', 'Requested appointment details:');
    cy.get('img[alt="Doctor photo"]').should('be.visible');
    cy.get('p[class="whitespace-nowrap"]').should(
      'have.text',
      'Dr. Leila Cameron'
    );
    cy.get('img[alt="Calendar icon"]').should('be.visible');
    cy.get('p').eq(3).should('have.text', 'Aug 17, 2024, 10:35 PM');
    cy.get('a').should('have.text', 'New Appointment');
    cy.get('p').last().should('have.text', '© 2024 CarePulse');
  });
});
