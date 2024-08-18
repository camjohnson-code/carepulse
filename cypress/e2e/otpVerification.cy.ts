import { SELECTORS, MESSAGES } from '../support/constants';

describe('Appointment Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/admin?_rsc=ftl5t', {
      statusCode: 404,
      body: 'Not Found',
    }).as('getAdminRequest');

    cy.intercept('GET', '/?_rsc=ftl5t', {
      statusCode: 200,
      body: [
        'development',
        [['children', '__PAGE__', ['__PAGE__', {}], null, null]],
      ],
    }).as('getFirstRequest');

    cy.intercept('GET', '/?_rsc=1h9g0', {
      statusCode: 200,
      body: [
        '3:I["(app-pages-browser)/./node_modules/next/dist/client/image-component.js",["app/page","static/chunks/app/page.js"],"Image"]',
        '4:I["(app-pages-browser)/./components/ui/forms/PatientForm.tsx",["app/page","static/chunks/app/page.js"],"default"]',
        '5:I["(app-pages-browser)/./node_modules/next/dist/client/link.js",["app/page","static/chunks/app/page.js"],""]',
        '1:D{"name":"","env":"Server"}',
        '2:D{"name":"Home","env":"Server"}',
        '2:["$","div",null,{"className":"flex h-screen max-h-screen","children":[false,["$","section",null,{"className":"remove-scrollbar container my-auto","children":["$","div",null,{"className":"sub-container max-w-[496px]","children":[["$","$L3",null,{"src":"/assets/icons/logo-full.svg","height":1000,"width":1000,"alt":"CarePulse logo","className":"mb-12 h-10 w-fit"}],["$","$L4",null,{}],["$","div",null,{"className":"text-14-regular mt-20 flex justify-between","children":[["$","p",null,{"className":"justify-items-end text-dark-600 xl:text-left","data-testid":"copyright-text","children":"Â© 2024 Care Pulse"}],["$","$L5",null,{"href":"/?admin=true","className":"text-green-500","children":"Admin"}]]}]]}]}],["$","$L3",null,{"src":"/assets/images/onboarding-img.png","height":1000,"width":1000,"alt":"Doctors and medical care team smiling","className":"side-img max-w-[50%]"}]]}]',
        '6:D{"name":"rQ","env":"Server"}',
        '6:null',
        '7:D{"name":"","env":"Server"}',
        '0:["development",[["children","__PAGE__",["__PAGE__",{}],["__PAGE__",{},[["$L1","$2"],null],null],[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/app/page.css?v=1724005130604","precedence":"next_static/css/app/page.css","crossOrigin":"$undefined"}]],["$6","$L7"]]]]]',
        '7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"CarePulse"}],["$","meta","3",{"name":"description","content":"A healthcare management system"}],["$","meta","4",{"name":"next-size-adjust"}]]',
        '1:null',
      ],
    }).as('getSecondRequest');

    cy.visit('localhost:3000/?admin=true');
  });

  it('should show the passkey modal', () => {
    cy.get(SELECTORS.otpHeader)
      .should('be.visible')
      .should('have.text', 'Admin Access Verification');
    cy.get(SELECTORS.otpMessage)
      .should('be.visible')
      .should(
        'have.text',
        'To access the admin page, please enter the passkey.'
      );
    cy.get(SELECTORS.closeButton).should('be.visible');
    cy.get(SELECTORS.enterPassKeyButton).should('be.visible');
    cy.get(SELECTORS.enterPassKeyButton)
      .should('be.visible')
      .should('have.text', 'Enter Admin Passkey');
  });

  it('should be able to close the passkey modal', () => {
    cy.get(SELECTORS.closeButton).click();
    cy.get(SELECTORS.enterPassKeyButton).should('not.exist');
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should show error message when passkey is invalid', () => {
    cy.get(SELECTORS.enterPassKeyButton).should('be.visible');
    cy.get(SELECTORS.enterPassKeyButton).click();
    cy.get(SELECTORS.passKeyError)
      .should('be.visible')
      .should('have.text', MESSAGES.passKeyErrorMessage);
    cy.get(SELECTORS.passKeyInput).click().type('111111');
    cy.get(SELECTORS.passKeyError)
      .should('be.visible')
      .should('have.text', MESSAGES.passKeyErrorMessage);
  });

  it('should be able to enter passkey and redirect to the admin page', () => {
    cy.get(SELECTORS.passKeyInput).click().type('123456');
    cy.get(SELECTORS.enterPassKeyButton).click();
    cy.url().should('eq', 'http://localhost:3000/admin');
  });
});
