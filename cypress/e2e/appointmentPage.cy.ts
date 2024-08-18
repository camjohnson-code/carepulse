import { SELECTORS, MESSAGES } from '../support/constants';

describe('Appointment Page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/patients/66c0cf890036ebdc0dcb/new-appointment');
    cy.intercept(
      'POST',
      '/patients/66c0cf890036ebdc0dcb/new-appointment',
      (req) => {
        req.reply({
          statusCode: 200,
          body: [
            '$@1',
            ['development', null],
            {
              userId: '66c0cf890036ebdc0dcb',
              primaryPhysician: 'John Green',
              schedule: '2024-08-16T04:47:37.000+00:00',
              reason: 'I need a checkup',
              note: 'I have been feeling unwell',
              status: 'pending',
              $id: '66c17cea0010a546f35b',
              $permissions: [],
              $createdAt: '2024-08-18T04:47:38.810+00:00',
              $updatedAt: '2024-08-18T04:47:38.810+00:00',
              $tenant: '186633',
              patient: {
                email: 'cameron.n.johnson15@gmail.com',
                phone: '+6055531198',
                userId: '66c0cf890036ebdc0dcb',
                name: 'Cameron Johnson',
                privacyConsent: true,
                birthDate: '2024-08-18T03:35:10.828Z',
                address: '10176 S Cherryhurst Lane',
                occupation: 'Software Dev',
                emergencyContactName: 'Jasmine Dimeo',
                emergencyContactNumber: '+13103840179',
                insuranceProvider: 'United Healthcare',
                insurancePolicyNumber: '1234567890',
                allergies: '',
                currentMedication: '',
                familyMedicalHistory: '',
                pastMedicalHistory: '',
                identificationType: 'Birth Certificate',
                identificationNumber: '',
                identificationDocumentId: null,
                primaryPhysician: 'John Green',
                identificationDocumentUrl:
                  'https://cloud.appwrite.io/v1/storage/buckets/66c0c774000b071b4a50/files/undefined/view?project=66c0c658001bfc14af16',
                gender: 'Male',
                treatmentConsent: true,
                disclosureConsent: true,
                $id: '66c16c080000ac5d0dd6',
                $tenant: '186633',
                $createdAt: '2024-08-18T03:35:36.484+00:00',
                $updatedAt: '2024-08-18T03:35:36.484+00:00',
                $permissions: [],
                $databaseId: '66c0c6ea0017fe04580e',
                $collectionId: '66c0c7150031b6ab408f',
              },
              cancellationReason: null,
              $databaseId: '66c0c6ea0017fe04580e',
              $collectionId: '66c0c74b00152dfcb64e',
            },
          ],
        });
      }
    ).as('createAppointment');
  });

  it('should display the appointment page', () => {
    cy.get(SELECTORS.logo).should('be.visible');
    cy.get(SELECTORS.header)
      .should('be.visible')
      .should('have.text', MESSAGES.appointmentHeader);
    cy.get(SELECTORS.headerText)
      .should('be.visible')
      .should('have.text', MESSAGES.appointmentHeaderText);
    cy.get(SELECTORS.primaryPhysicianSelect)
      .should('be.visible')
      .should('have.attr', 'data-state', 'closed');
    cy.get(SELECTORS.timePickerInput).should('be.visible');
    cy.get(SELECTORS.scheduleReasonTextArea)
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Enter reason for appointment');
    cy.get(SELECTORS.noteTextArea)
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Enter any additional notes');
    cy.get(SELECTORS.submitButton)
      .should('be.visible')
      .should('have.text', 'Create Appointment');
  });

  it('should display the appointment page with the correct doctor options', () => {
    cy.get(SELECTORS.primaryPhysicianSelect).click();
    cy.get(SELECTORS.primaryPhysicianSelect).should(
      'have.attr',
      'data-state',
      'open'
    );
    cy.get('option')
      .should('have.length', 9)
      .each((option, index) => {
        cy.wrap(option).should(
          'have.text',
          [
            'John Green',
            'Leila Cameron',
            'David Livingston',
            'Evan Peter',
            'Jane Powell',
            'Alex Ramirez',
            'Jasmine Lee',
            'Alyana Cruz',
            'Hardik Sharma',
          ][index]
        );
      });
  });

  it('should display the appointment page with the correct date and time picker', () => {
    cy.get(SELECTORS.timePickerInput).click();
    cy.get('.react-datepicker__day')
      .should('have.length', 35)
      .each((day) => {
        cy.wrap(day).should('have.class', 'react-datepicker__day');
      });

    cy.getCurrentFormattedDate().then((formattedDate) => {
      cy.get(SELECTORS.timePickerInput).should('have.value', formattedDate);
    });
  });

  it('should successfully fill out the form', () => {
    cy.get('.shad-select-trigger').first().click({ force: true });
    cy.get('.shad-select-content')
      .contains('John Green')
      .click({ force: true });
    cy.get(SELECTORS.timePickerInput).click();
    cy.get('.react-datepicker__day').contains('15').click();
    cy.get(SELECTORS.scheduleReasonTextArea).type('I need a checkup', {
      force: true,
    });
    cy.get(SELECTORS.noteTextArea).type('I have been feeling unwell', {
      force: true,
    });
    cy.get(SELECTORS.loadingIcon).should('not.exist');
    cy.get(SELECTORS.submitButton).click();
    cy.get(SELECTORS.loadingIcon).should('be.visible');
    cy.get(SELECTORS.submitButton).should('have.text', 'Loading...');
  });

  it("sees errors if the form isn't filled out correctly", () => {
    cy.get(SELECTORS.submitButton).click();
    cy.get('p.shad-error')
      .first()
      .should('be.visible')
      .should('have.text', 'Select at least one doctor');
    cy.get('p.shad-error')
      .last()
      .should('be.visible')
      .should('have.text', 'Reason must be at least 2 characters');
  });

  it("should remove the errors when they're fixed", () => {
    cy.get(SELECTORS.submitButton).click();
    cy.get('p.shad-error')
      .first()
      .should('be.visible')
      .should('have.text', 'Select at least one doctor');
    cy.get('p.shad-error')
      .last()
      .should('be.visible')
      .should('have.text', 'Reason must be at least 2 characters');
    cy.get('.shad-select-trigger').first().click({ force: true });
    cy.get('.shad-select-content')
      .contains('John Green')
      .click({ force: true });
    cy.get(SELECTORS.scheduleReasonTextArea).type('I need a checkup', {
      force: true,
    });
    cy.get('p.shad-error').should('not.exist');
  });
});
