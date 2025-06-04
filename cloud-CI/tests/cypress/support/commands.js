// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillPaymentForm', (data = {}) => {
    const {
        name = 'Test',
        surname = 'Testman',
        email = 'ttest@example.com',
        cardNumber = '1234567890123456',
    } = data

    if (name) cy.get('input[name="name"]').type(name)
    if (surname) cy.get('input[name="surname"]').type(surname)
    if (email) cy.get('input[name="email"]').type(email)
    if (cardNumber) cy.get('input[name="cardNumber"]').type(cardNumber)
})
