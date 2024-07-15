describe('Rates an user', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/profile')
    cy.get('#email').type('joao@email.com')
    cy.get('#password').type('123456*aB')
    cy.get('.access-button').click()
    cy.get('img[src="https://i.imgur.com/WT2bMEj.jpeg"]').click();
    cy.get('.profile-user').click();
    cy.get('.profile-rating .rateBtn').eq(3).click();
  })
})