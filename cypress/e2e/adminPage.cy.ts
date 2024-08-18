import { SELECTORS, MESSAGES } from '../support/constants';

describe('Admin Page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/admin');
  });

  it('should display the admin page', () => {
    cy.get('.admin-header')
      .should('exist')
      .within(() => {
        cy.get(SELECTORS.logo).should('exist');
        cy.get('p').should('have.text', 'Admin Dashboard');
      });
    cy.get(SELECTORS.header).should('have.text', MESSAGES.adminDashboardHeader);
    cy.get(SELECTORS.adminDashboardText).should(
      'have.text',
      MESSAGES.adminDashboardHeaderText
    );
    cy.get(SELECTORS.scheduledAppointmentCard)
      .should('exist')
      .within(() => {
        cy.get('p').should('have.text', 'Scheduled Appointments');
        cy.get('div').within(() => {
          cy.get('img').should(
            'have.attr',
            'src',
            '/assets/icons/appointments.svg'
          );
          cy.get('h2').should('have.text', '2');
        });
      });
    cy.get(SELECTORS.pendingAppointmentCard)
      .should('exist')
      .within(() => {
        cy.get('p').should('have.text', 'Pending Appointments');
        cy.get('div').within(() => {
          cy.get('img').should('have.attr', 'src', '/assets/icons/pending.svg');
          cy.get('h2').should('have.text', '0');
        });
      });
    cy.get(SELECTORS.cancelledAppointmentCard)
      .should('exist')
      .within(() => {
        cy.get('p').should('have.text', 'Cancelled Appointments');
        cy.get('div').within(() => {
          cy.get('img').should(
            'have.attr',
            'src',
            '/assets/icons/cancelled.svg'
          );
          cy.get('h2').should('have.text', '17');
        });
      });
    cy.get(SELECTORS.dashboardTable).should('exist');
    cy.get('th').should('have.length', 6);
    cy.get('tr').should('have.length.lte', 11);
    cy.get(SELECTORS.paginationButtonDiv)
      .should('exist')
      .within(() => {
        cy.get('button').should('have.length', 2);
      });
  });

  // it should be able to schedule an appointment
  // it should be able to cancel an appointment
  // it should be able to paginate through the results
});
