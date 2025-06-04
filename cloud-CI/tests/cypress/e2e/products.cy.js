// 4 test cases
// 13 asserts

describe('Products', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the product list', () => {
    cy.get('h1').should('contain', 'Produkty')
    cy.get('li').should('have.length', 3)
    cy.get('p').filter(':contains("Cena")').should('have.length', 3)
    cy.get('button').filter(':contains("Dodaj do koszyka")').should('have.length', 3)
  })

  it('should add a product to the cart', () => {
    cy.get('button').filter(':contains("Dodaj do koszyka")').first().click()
    cy.contains('Koszyk').click()
    cy.url().should('include', '/cart')
    cy.get('li').should('have.length', 1)
    cy.get('button').filter(':contains("Usuń")').should('have.length', 1)
  })

  it('should add the same product twice', () => {
    cy.get('button').filter(':contains("Dodaj do koszyka")').first().click().click()
    cy.contains('Koszyk').click()
    cy.url().should('include', '/cart')
    cy.get('li').first().should('contain', 'Ilość: 2')
    cy.get('button').filter(':contains("Usuń")').should('have.length', 1)
  })

  it('should add different products', () => {
    cy.get('button').filter(':contains("Dodaj do koszyka")').eq(0).click()
    cy.get('button').filter(':contains("Dodaj do koszyka")').eq(1).click()
    cy.contains('Koszyk').click()
    cy.url().should('include', '/cart')
    cy.get('li').should('have.length', 2)
    cy.get('button').filter(':contains("Usuń")').should('have.length', 2)
  })
})
