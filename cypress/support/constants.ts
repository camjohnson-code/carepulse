export const SELECTORS = {
  logo: 'img[alt="CarePulse logo"]',
  header: 'h1',
  headerText: '[data-testid="header-text"]',
  nameInput: 'input[name="name"]',
  emailInput: 'input[name="email"]',
  phoneInput: 'input[name="phone"]',
  submitButton: 'button[type="submit"]',
  loadingIcon: "img[alt='Loading icon']",
  copyrightText: '[data-testid="copyright-text"]',
  adminLink: 'a',
  heroImage: 'img[alt="Doctors and medical care team smiling"]',
  patientRegistrationHeaderP: '[data-testid="header-p-text"]',
  personalInfoTitle: '[data-testid="personal-info-title"]',
  birthDateInput: 'input[name="birthDate"]',
  radioGroupDiv: '[data-testid="radio-group-div"]',
  addressInput: 'input[name="address"]',
  occupationInput: 'input[name="occupation"]',
  emergencyContactInput: 'input[name="emergencyContactName"]',
  emergencyPhoneInput: 'input[name="emergencyContactNumber"]',
  medicalInfoTitle: '[data-testid="medical-info-title"]',
  primaryPhysicianSelect: 'button[name="primaryPhysician"]',
  insuranceProviderInput: 'input[name="insuranceProvider"]',
  insurancePolicyNumberInput: 'input[name="insurancePolicyNumber"]',
  allergiesInput: 'textarea[name="allergies"]',
  currentMedicationInput: 'textarea[name="currentMedication"]',
  familyMedicalHistoryInput: 'textarea[name="familyMedicalHistory"]',
  pastMedicalHistoryInput: 'textarea[name="pastMedicalHistory"]',
  identificationTypeInput: 'button[name="identificationType"]',
  identificationNumberInput: 'input[name="identificationNumber"]',
  consentTitle: '[data-testid="consent-title"]',
  treatmentConsentCheckbox: 'button[id="treatmentConsent"]',
  treatmentConsentLabel: 'label[for="treatmentConsent"]',
  disclosureConsentCheckbox: 'button[id="disclosureConsent"]',
  disclosureConsentLabel: 'label[for="disclosureConsent"]',
  privacyConsentCheckbox: 'button[id="privacyConsent"]',
  privacyConsentLabel: 'label[for="privacyConsent"]',
  timePickerInput: 'input[name="schedule"]',
  scheduleReasonTextArea: 'textarea[name="reason"]',
  noteTextArea: 'textarea[name="note"]',
};

export const MESSAGES = {
  header: 'Hi there! 👋',
  patientRegistrationHeader: 'Welcome! 👋',
  appointmentHeader: 'New Appointment',
  headerText: 'Schedule your next appointment.',
  patientRegistrationHeaderText: 'Let us know more about you.',
  appointmentHeaderText: 'Request a new appointment.',
  namePlaceholder: 'John Doe',
  emailPlaceholder: 'john@doe.com',
  phonePlaceholder: '(123) 456-7890',
  copyright: '© 2024 Care Pulse',
  adminLink: 'Admin',
  nameError: 'Name must be at least 2 characters',
  emailError: 'Invalid email address',
  phoneError: 'Invalid phone number',
  addressError: 'Address must be at least 5 characters',
  occupationError: 'Occupation must be at least 2 characters',
  emergencyContactNameError: 'Contact name must be at least 2 characters',
  primaryCarePhysicianError: 'Select at least one doctor',
  insuranceProviderError: 'Insurance name must be at least 2 characters',
  insurancePolicyError: 'Policy number must be at least 2 characters',
  treatmentError: 'You must consent to treatment in order to proceed',
  disclosureError: 'You must consent to disclosure in order to proceed',
  privacyError: 'You must consent to the privacy policy in order to proceed',
  nameMaxError: 'Name must be at most 50 characters',
  submitButtonLoading: 'Loading...',
  submitButtonDefault: 'Get Started',
  submitButtonRegistration: 'Submit and continue',
};
