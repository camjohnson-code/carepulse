export const SELECTORS = {
  logo: 'img[alt="CarePulse logo"]',
  header: 'h1',
  headerText: '[data-testid="header-text"]',
  nameInput: 'input[name="name"]',
  emailInput: 'input[name="email"]',
  phoneInput: 'input[type="tel"]',
  submitButton: 'button[type="submit"]',
  loadingIcon: "img[alt='Loading icon']",
  copyrightText: '[data-testid="copyright-text"]',
  adminLink: 'a',
  heroImage: 'img[alt="Doctors and medical care team smiling"]',
};

export const MESSAGES = {
  header: 'Hi there! 👋',
  headerText: 'Schedule your next appointment.',
  namePlaceholder: 'John Doe',
  emailPlaceholder: 'john@doe.com',
  phonePlaceholder: '(123) 456-7890',
  copyright: '© 2024 Care Pulse',
  adminLink: 'Admin',
  nameError: 'Name must be at least 2 characters.',
  emailError: 'Invalid email address',
  phoneError: 'Invalid phone number',
  nameMaxError: 'Name must be at most 50 characters.',
  submitButtonLoading: 'Loading...',
  submitButtonDefault: 'Get Started',
};
