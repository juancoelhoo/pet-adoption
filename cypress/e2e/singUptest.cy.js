describe('sign-up page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup')
  })

  it('creates an account with valid inputs', () => {
    cy.get('#nome').type('Joao da Silva')
    cy.get('#email').type('joao@email.com')
    cy.get('#password').type('123456*aB')
    cy.get('#confirm-password').type('123456*aB')
    cy.get('.access-button').click()
  })

  it('shows an error for missing name', () => {
    cy.get('#email').type('joao@email.com')
    cy.get('#password').type('123456*aB')
    cy.get('#confirm-password').type('123456*aB')
    cy.get('.access-button').click()
    cy.get('#nome:invalid')
    .invoke('prop', 'validationMessage')
    .should('equal', 'Please fill out this field.')
  })

  it('shows an error for missing email', () => {
    cy.get('#nome').type('Joao da Silva')
    cy.get('#password').type('123456*aB')
    cy.get('#confirm-password').type('123456*aB')
    cy.get('.access-button').click()
    cy.get('#email:invalid')
    .invoke('prop', 'validationMessage')
    .should('equal', 'Please fill out this field.')
  })

  it('shows an error for missing password', () => {
    cy.get('#nome').type('Joao da Silva')
    cy.get('#email').type('joao@email.com')
    cy.get('#confirm-password').type('123456*aB')
    cy.get('.access-button').click()
    cy.get('#password:invalid')
    .invoke('prop', 'validationMessage')
    .should('equal', 'Please fill out this field.')
  })

  it('shows an error for missing confirm password', () => {
    cy.get('#nome').type('Joao da Silva')
    cy.get('#email').type('joao@email.com')
    cy.get('#password').type('123456*aB')
    cy.get('.access-button').click()
    cy.get('#confirm-password:invalid')
    .invoke('prop', 'validationMessage')
    .should('equal', 'Please fill out this field.')
  })

  it('shows an error for invalid email format', () => {
    cy.get('#nome').type('Joao da Silva')
    cy.get('#email').type('invalid-email')
    cy.get('#password').type('123456*aB')
    cy.get('#confirm-password').type('123456*aB')
    cy.get('.access-button').click()
    cy.get('#email:invalid')
    .invoke('prop', 'validationMessage')
    .should('equal', `Please include an \'@\' in the email address. \'invalid-email\' is missing an \'@\'.`)
  })

  it('shows an error for non-matching passwords', () => {
    cy.get('#nome').type('Joao da Silva')
    cy.get('#email').type('joao@email.com')
    cy.get('#password').type('123456*aB')
    cy.get('#confirm-password').type('differentpassword')
    cy.get('.access-button').click()
    cy.contains('As senhas não coincidem. Por favor, tente novamente.').should('be.visible')
  })

  it('shows an error for weak password', () => {
    cy.get('#nome').type('Joao da Silva')
    cy.get('#email').type('joao@email.com')
    cy.get('#password').type('123')
    cy.get('#confirm-password').type('123')
    cy.get('.access-button').click()
    cy.get('#password:invalid')
    .invoke('prop', 'validationMessage')
    .should('equal', 'Please match the requested format.')
  })
})

describe('login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('logs in with valid credentials', () => {
    cy.get('#email').type('joao@email.com')
    cy.get('#password').type('123456*aB')
    cy.get('.access-button').click()
  })

  it('shows an error for missing email', () => {
    cy.get('#password').type('123456*aB')
    cy.get('.access-button').click()
    cy.get('#email:invalid')
    .invoke('prop', 'validationMessage')
    .should('equal', 'Please fill out this field.')
  })

  it('shows an error for missing password', () => {
    cy.get('#email').type('joao@email.com')
    cy.get('.access-button').click()
    cy.get('#password:invalid')
    .invoke('prop', 'validationMessage')
    .should('equal', 'Please fill out this field.')
  })

  it('shows an error for invalid email format', () => {
    cy.get('#email').type('invalid-email')
    cy.get('#password').type('123456*aB')
    cy.get('.access-button').click()
    cy.get('#email:invalid')
    .invoke('prop', 'validationMessage')
    .should('equal', `Please include an \'@\' in the email address. \'invalid-email\' is missing an \'@\'.`)
  })

  it('shows an error for incorrect password', () => {
    cy.get('#email').type('joao@email.com')
    cy.get('#password').type('wrongpassword')
    cy.get('.access-button').click()
    cy.contains('Email ou senha inválidos. Por favor, tente novamente.').should('be.visible')
  })

  it('shows an error for non-existing email', () => {
    cy.get('#email').type('nonexisting@email.com')
    cy.get('#password').type('123456*aB')
    cy.get('.access-button').click()
    cy.contains('Email ou senha inválidos. Por favor, tente novamente.').should('be.visible')
  })
})
