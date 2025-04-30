// 4 test cases
// 5 asserts

describe('Cart', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('button').filter(':contains("Dodaj do koszyka")').first().click()
        cy.contains('Koszyk').click()
    })

    it('should display the added product', () => {
        cy.get('li').should('have.length', 1)
        cy.get('li').first().should('contain', 'Produkt 1')
        cy.get('button').should('contain', 'Usuń')
    })

    it('should remove a product from the cart', () => {
        cy.get('button').filter(':contains("Usuń")').click()
        cy.get('body').should('contain', 'Koszyk jest pusty')
    })

    it('should submit the cart', () => {
        cy.get('button').filter(':contains("Zatwierdź koszyk")').click()
    })

    it('should clear the cart', () => {
        cy.get('button').filter(':contains("Wyczyść koszyk")').click()
        cy.get('body').should('contain', 'Koszyk jest pusty')
    })
})
