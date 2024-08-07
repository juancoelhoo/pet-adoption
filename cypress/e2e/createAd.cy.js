describe('Ad creation and deletion', () => {
  it('creates an ad', () => {
    cy.visit('http://localhost:3000/profile')
    cy.get('#email').type('joao@email.com')
    cy.get('#password').type('123456*aB')
    cy.get('.access-button').click()
    cy.get('img.config').click()
    cy.get('.add-ad').click()
    cy.get('.img-upload-container nav.input img[alt="add-image"]').click()
    cy.get('input[type="file"]').attachFile('../../frontend/public/testImage.jpg')
    cy.get('#name').type('bolinha')
    cy.get('#breed').type('husky')
    cy.get('#age').type('2')
    cy.get('#description').type('Um cachorro lindo')
    cy.get('.create-btn').click()
  })
  it('deletes an ad', () => {
    cy.visit('http://localhost:3000/profile')
    cy.get('#email').type('joao@email.com')
    cy.get('#password').type('123456*aB')
    cy.get('.access-button').click()
    cy.get('img.config').click()
    cy.get('.dropdown-btn').click()
    cy.get('.dropdown-menu li').contains('Excluir').click()
  })
})