import { SELECTORS, MESSAGES } from '../support/constants';

describe('Patient registration page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/patients/66c0cf890036ebdc0dcb/register');
    cy.intercept('POST', '/patients/66c0cf890036ebdc0dcb/register', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          identificationDocumentId: null,
          identificationDocumentUrl:
            'https://cloud.appwrite.io/v1/storage/buckets/66c0c774000b071b4a50/files/undefined/view?project=66c0c658001bfc14af16',
          name: 'John Doe',
          email: 'john@doe.com',
          phone: '+1234567890',
          birthDate: '2024-08-17T23:47:18.197Z',
          gender: 'Male',
          address: '123 Mulberry Lane, Denver, CO 80202',
          occupation: 'Software Engineer',
          emergencyContactName: 'Jane Doe',
          emergencyContactNumber: '+1234567890',
          primaryPhysician: 'John Green',
          insuranceProvider: 'United Healthcare',
          insurancePolicyNumber: 'ABC123456789',
          allergies: 'Peanuts, Penicillin, etc.',
          currentMedication: 'Ibuprofen (200mg), Parcetamol (500mg), etc.',
          familyMedicalHistory: 'Diabetes, Hypertension, etc.',
          pastMedicalHistory: 'Asthma, Chickenpox, etc.',
          identificationType: "Driver's License",
          identificationNumber: '1234567890',
          treatmentConsent: true,
          disclosureConsent: true,
          privacyConsent: true,
          userId: '66c0cf890036ebdc0dcb',
          $id: '66c1368e00308d9f6eea',
          $permissions: [],
          $createdAt: '2024-08-17T23:47:27.275+00:00',
          $updatedAt: '2024-08-17T23:47:27.275+00:00',
          $tenant: '186633',
          $databaseId: '66c0c6ea0017fe04580e',
          $collectionId: '66c0c7150031b6ab408f',
        },
      });
    }).as('postRequest');
  });

  const checkElement = (
    selector: string,
    text: string | null = null,
    attr: string | null = null,
    attrValue: string | null = null
  ) => {
    const element = cy.get(selector).should('exist');
    if (text) element.and('have.text', text);
    if (attr && attrValue) element.and('have.attr', attr, attrValue);
  };

  it('sees the items on the page', () => {
    checkElement(SELECTORS.logo);
    checkElement(SELECTORS.header, MESSAGES.patientRegistrationHeader);
    checkElement(
      SELECTORS.patientRegistrationHeaderP,
      MESSAGES.patientRegistrationHeaderText
    );
    checkElement(SELECTORS.personalInfoTitle, 'Personal Information');
    checkElement(
      SELECTORS.nameInput,
      null,
      'placeholder',
      MESSAGES.namePlaceholder
    );
    checkElement(
      SELECTORS.emailInput,
      null,
      'placeholder',
      MESSAGES.emailPlaceholder
    );
    checkElement(
      SELECTORS.phoneInput,
      null,
      'placeholder',
      MESSAGES.phonePlaceholder
    );
    checkElement(SELECTORS.birthDateInput);
    checkElement(SELECTORS.radioGroupDiv);
    checkElement(
      SELECTORS.addressInput,
      null,
      'placeholder',
      '123 Mulberry Lane, Denver, CO 80202'
    );
    checkElement(
      SELECTORS.occupationInput,
      null,
      'placeholder',
      'Software Engineer'
    );
    checkElement(
      SELECTORS.emergencyContactInput,
      null,
      'placeholder',
      `Guardian's name`
    );
    checkElement(
      SELECTORS.emergencyPhoneInput,
      null,
      'placeholder',
      '(123) 456-7890'
    );
    checkElement(SELECTORS.medicalInfoTitle, 'Medical Information');
    checkElement(SELECTORS.primaryPhysicianSelect);
    checkElement(
      SELECTORS.insuranceProviderInput,
      null,
      'placeholder',
      'United Healthcare'
    );
    checkElement(
      SELECTORS.insurancePolicyNumberInput,
      null,
      'placeholder',
      'ABC123456789'
    );
    checkElement(
      SELECTORS.allergiesInput,
      null,
      'placeholder',
      'Peanuts, Penicillin, etc.'
    );
    checkElement(
      SELECTORS.currentMedicationInput,
      null,
      'placeholder',
      'Ibuprofen (200mg), Parcetamol (500mg), etc.'
    );
    checkElement(
      SELECTORS.familyMedicalHistoryInput,
      null,
      'placeholder',
      'Diabetes, Hypertension, etc.'
    );
    checkElement(
      SELECTORS.pastMedicalHistoryInput,
      null,
      'placeholder',
      'Asthma, Chickenpox, etc.'
    );
    checkElement(SELECTORS.identificationTypeInput);
    checkElement(
      SELECTORS.identificationNumberInput,
      null,
      'placeholder',
      '1234567890'
    );
    checkElement(SELECTORS.consentTitle, 'Consent and Privacy');
    checkElement(SELECTORS.treatmentConsentCheckbox, null, 'type', 'button');
    cy.get(SELECTORS.treatmentConsentCheckbox).should('not.be.checked');
    checkElement(SELECTORS.treatmentConsentLabel, 'I consent to treatment');
    checkElement(SELECTORS.disclosureConsentCheckbox, null, 'type', 'button');
    cy.get(SELECTORS.disclosureConsentCheckbox).should('not.be.checked');
    checkElement(
      SELECTORS.disclosureConsentLabel,
      'I consent to disclosure of information'
    );
    checkElement(SELECTORS.privacyConsentCheckbox, null, 'type', 'button');
    cy.get(SELECTORS.privacyConsentCheckbox).should('not.be.checked');
    checkElement(SELECTORS.privacyConsentLabel, 'I consent to privacy policy');
    checkElement(SELECTORS.submitButton, MESSAGES.submitButtonRegistration);
    checkElement(SELECTORS.copyrightText, MESSAGES.copyright);
  });

  it('gets an error message when the form is left empty on submit', () => {
    cy.get(SELECTORS.submitButton).click();
    cy.checkErrorMessage(':R3j7rrrqcq:-form-item-message', MESSAGES.nameError);
    cy.checkErrorMessage(
      ':R14j7rrrqcq:-form-item-message',
      MESSAGES.emailError
    );
    cy.checkErrorMessage(
      ':R24j7rrrqcq:-form-item-message',
      MESSAGES.phoneError
    );
    cy.checkErrorMessage(
      ':R16j7rrrqcq:-form-item-message',
      MESSAGES.addressError
    );
    cy.checkErrorMessage(
      ':R26j7rrrqcq:-form-item-message',
      MESSAGES.occupationError
    );
    cy.checkErrorMessage(
      ':R17j7rrrqcq:-form-item-message',
      MESSAGES.emergencyContactNameError
    );
    cy.checkErrorMessage(
      ':R27j7rrrqcq:-form-item-message',
      MESSAGES.phoneError
    );
    cy.checkErrorMessage(
      ':R9j7rrrqcq:-form-item-message',
      MESSAGES.primaryCarePhysicianError
    );
    cy.checkErrorMessage(
      ':R1aj7rrrqcq:-form-item-message',
      MESSAGES.insuranceProviderError
    );
    cy.checkErrorMessage(
      ':R2aj7rrrqcq:-form-item-message',
      MESSAGES.insurancePolicyError
    );
    cy.checkErrorMessage(
      ':Rij7rrrqcq:-form-item-message',
      MESSAGES.treatmentError
    );
    cy.checkErrorMessage(
      ':Rjj7rrrqcq:-form-item-message',
      MESSAGES.disclosureError
    );
    cy.checkErrorMessage(
      ':Rkj7rrrqcq:-form-item-message',
      MESSAGES.privacyError
    );
    cy.get(SELECTORS.submitButton)
      .should('not.be.disabled')
      .should('have.text', MESSAGES.submitButtonRegistration);
  });

  it('gets an error message when the form is filled with invalid data', () => {
    cy.get(SELECTORS.nameInput).type('J');
    cy.get(SELECTORS.emailInput).type('john@');
    cy.get(SELECTORS.phoneInput).type('123');
    cy.get(SELECTORS.submitButton).click();
    cy.checkErrorMessage(':R3j7rrrqcq:-form-item-message', MESSAGES.nameError);
    cy.checkErrorMessage(
      ':R14j7rrrqcq:-form-item-message',
      MESSAGES.emailError
    );
    cy.checkErrorMessage(
      ':R24j7rrrqcq:-form-item-message',
      MESSAGES.phoneError
    );
    cy.checkErrorMessage(
      ':R16j7rrrqcq:-form-item-message',
      MESSAGES.addressError
    );
    cy.checkErrorMessage(
      ':R26j7rrrqcq:-form-item-message',
      MESSAGES.occupationError
    );
    cy.checkErrorMessage(
      ':R17j7rrrqcq:-form-item-message',
      MESSAGES.emergencyContactNameError
    );
    cy.checkErrorMessage(
      ':R27j7rrrqcq:-form-item-message',
      MESSAGES.phoneError
    );
    cy.checkErrorMessage(
      ':R9j7rrrqcq:-form-item-message',
      MESSAGES.primaryCarePhysicianError
    );
    cy.checkErrorMessage(
      ':R1aj7rrrqcq:-form-item-message',
      MESSAGES.insuranceProviderError
    );
    cy.checkErrorMessage(
      ':R2aj7rrrqcq:-form-item-message',
      MESSAGES.insurancePolicyError
    );
    cy.checkErrorMessage(
      ':Rij7rrrqcq:-form-item-message',
      MESSAGES.treatmentError
    );
    cy.checkErrorMessage(
      ':Rjj7rrrqcq:-form-item-message',
      MESSAGES.disclosureError
    );
    cy.checkErrorMessage(
      ':Rkj7rrrqcq:-form-item-message',
      MESSAGES.privacyError
    );
    cy.get(SELECTORS.submitButton)
      .should('not.be.disabled')
      .should('have.text', MESSAGES.submitButtonRegistration);
    cy.get(SELECTORS.loadingIcon).should('not.exist');
    cy.get(SELECTORS.nameInput).type('J'.repeat(50));
    cy.checkErrorMessage(
      ':R3j7rrrqcq:-form-item-message',
      MESSAGES.nameMaxError
    );
  });

  it('removes the error message and submits the form when the input is valid', () => {
    cy.get(SELECTORS.nameInput).type('J');
    cy.get(SELECTORS.emailInput).type('john@');
    cy.get(SELECTORS.phoneInput).type('123');
    cy.get(SELECTORS.submitButton).click();
    cy.checkErrorMessage(':R3j7rrrqcq:-form-item-message', MESSAGES.nameError);
    cy.checkErrorMessage(
      ':R14j7rrrqcq:-form-item-message',
      MESSAGES.emailError
    );
    cy.checkErrorMessage(
      ':R24j7rrrqcq:-form-item-message',
      MESSAGES.phoneError
    );
    cy.get(SELECTORS.nameInput).type('J'.repeat(50));
    cy.checkErrorMessage(
      ':R3j7rrrqcq:-form-item-message',
      MESSAGES.nameMaxError
    );
    cy.get(SELECTORS.nameInput).clear().type('John Doe');
    cy.get(SELECTORS.emailInput).clear().type('john@doe.com');
    cy.get(SELECTORS.phoneInput).clear().type('(123) 456-7890');
    cy.get(SELECTORS.birthDateInput).clear().type('01/01/2000').type('{enter}');
    cy.get(SELECTORS.radioGroupDiv).within(() => {
      cy.get('div').first().find('button').click();
    });
    cy.get(SELECTORS.addressInput).type('123 Mulberry Lane, Denver, CO 80202');
    cy.get(SELECTORS.occupationInput).type('Software Engineer');
    cy.get(SELECTORS.emergencyContactInput).type('Jane Doe');
    cy.get(SELECTORS.emergencyPhoneInput).type('(123) 456-7890');
    cy.get('.shad-select-trigger').first().click({ force: true });
    cy.get('.shad-select-content')
      .contains('John Green')
      .click({ force: true });
    cy.get(SELECTORS.primaryPhysicianSelect)
      .click()
      .get('option[value="John Green"]')
      .click({ force: true });
    cy.get(SELECTORS.insuranceProviderInput).type('United Healthcare');
    cy.get(SELECTORS.insurancePolicyNumberInput).type('ABC123456789');
    cy.get(SELECTORS.allergiesInput).type('Peanuts, Penicillin, etc.');
    cy.get(SELECTORS.currentMedicationInput).type(
      'Ibuprofen (200mg), Parcetamol (500mg), etc.'
    );
    cy.get(SELECTORS.familyMedicalHistoryInput).type(
      'Diabetes, Hypertension, etc.'
    );
    cy.get(SELECTORS.pastMedicalHistoryInput).type('Asthma, Chickenpox, etc.');
    cy.get('.shad-select-trigger').last().click({ force: true });
    cy.get('.shad-select-content')
      .contains(`Driver's License`)
      .click({ force: true });
    cy.get(SELECTORS.identificationNumberInput).type('1234567890');
    cy.get(SELECTORS.treatmentConsentCheckbox).click();
    cy.get(SELECTORS.disclosureConsentCheckbox).click();
    cy.get(SELECTORS.privacyConsentCheckbox).click();

    cy.get(SELECTORS.submitButton).click({ force: true });
    cy.wait('@postRequest').then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body.name).to.equal('John Doe');
      }
    });
    cy.get(SELECTORS.loadingIcon).should('exist');
  });

  it('can click every gender button', () => {
    cy.get(SELECTORS.radioGroupDiv).within(() => {
      cy.get('div').each(($childDiv) => {
        cy.wrap($childDiv)
          .find('button')
          .click()
          .should('have.attr', 'data-state', 'checked');
      });
    });
  });
});
