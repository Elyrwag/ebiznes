// 4 test cases
// 15 asserts

describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should contain navigation links', () => {
        cy.get('a').should('have.length', 3)
        cy.should('contain', 'Produkty')
        cy.should('contain', 'Koszyk')
        cy.should('contain', 'Podsumowanie')
    })

    it('should navigate to Products page', () => {
        cy.get('a').filter(':contains("Produkty")').click()
        cy.url().should('include', '/')
        cy.get('h1').should('contain', 'Produkty')
        cy.get('li').should('have.length', 3)
        cy.get('p').should('have.length', 3)
        cy.get('button').should('have.length', 3)
    })

    it('should navigate to Cart page', () => {
        cy.get('a').filter(':contains("Koszyk")').click()
        cy.url().should('include', '/cart')
        cy.get('h1').should('contain', 'Koszyk')
        cy.get('body').should('contain', 'Koszyk jest pusty')
    })

    it('should navigate to Payments page', () => {
        cy.get('a').filter(':contains("Podsumowanie")').click()
        cy.url().should('include', '/payments')
        cy.get('h1').should('contain', 'Podsumowanie')
        cy.get('body').should('contain', 'Koszyk jest pusty')
    })
})
