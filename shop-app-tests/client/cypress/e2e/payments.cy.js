// 8 test cases
// 20 asserts

describe('Payments', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('button').filter(':contains("Dodaj do koszyka")').first().click()
    cy.contains('Podsumowanie').click()
  })

  it('should show the payment form with products', () => {
    cy.get('li').should('have.length', 1)
    cy.get('h2').should('contain', 'Produkty w koszyku:')
    cy.get('h2').filter(':contains("Produkty w koszyku:")')
        .nextAll('p').first().should('contain', 'Do zapłaty:')
    cy.get('form').should('exist')
    cy.get('input[name="name"]').should('exist')
    cy.get('input[name="surname"]').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="cardNumber"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('should hide form when cart is empty', () => {
    cy.contains('Koszyk').click()
    cy.get('button').filter(':contains("Wyczyść koszyk")').click()
    cy.contains('Podsumowanie').click()
    cy.get('body').should('contain', 'Koszyk jest pusty')
    cy.get('form').should('not.exist')
  })

  it('should show error message for empty name field', () => {
    cy.fillPaymentForm({name: ''})
    cy.get('button[type="submit"]').click()
    cy.get('input[name="name"]:invalid').should('exist')
  })

  it('should show error message for incorrect email field', () => {
    cy.fillPaymentForm({email: 'example'})
    cy.get('button[type="submit"]').click()
    cy.get('input[name="email"]:invalid').should('exist')
  })

  it('should validate empty payment form', () => {
    cy.fillPaymentForm({cardNumber: ''})
    cy.get('button[type="submit"]').click()
    cy.get('input[name="cardNumber"]:invalid').should('exist')
  })

  it('should validate incorrect card number', () => {
    cy.fillPaymentForm({cardNumber: '123'})
    cy.get('button[type="submit"]').click()
    cy.get('body').should('contain', 'Numer karty musi mieć dokładnie 16 cyfr')
  })

  it('should accept valid payment data', () => {
    cy.fillPaymentForm()
    cy.get('button[type="submit"]').click()
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Płatność zrealizowana!');
    })
    cy.get('body').should('not.contain', 'Wystąpił błąd podczas przetwarzania płatności.')
  })

  it('should clear cart after successful payment', () => {
    cy.fillPaymentForm()
    cy.get('button[type="submit"]').click()
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Płatność zrealizowana!');
    })
    cy.get('body').should('not.contain', 'Wystąpił błąd podczas przetwarzania płatności.')
    cy.contains('Koszyk').click()
    cy.get('body').should('contain', 'Koszyk jest pusty')
  })
})
