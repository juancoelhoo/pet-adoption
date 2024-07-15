describe('Sign-up and login flow', () => {
  it('logs in and performs sign-up', () => {
    // Realiza o login uma vez antes de todos os testes
    cy.visit('http://localhost:3000/');
    cy.get('#email').type('joao@email.com');
    cy.get('#password').type('123456*aB');
    cy.get('.access-button').click();

    // Verifica se o login foi bem-sucedido redirecionando para a página principal
    cy.url().should('eq', 'http://localhost:3000/');

    // Teste de sign-up
    cy.visit('http://localhost:3000/signup');
    cy.get('#nome').type('Joao da Silva');
    cy.get('#email').type('joao@email.com');
    cy.get('#password').type('123456*aB');
    cy.get('#confirm-password').type('123456*aB');
    cy.get('.access-button').click();
  });

  it('logs in and report Pet Ads', () => {
    // Realiza o login uma vez antes de todos os testes
    cy.visit('http://localhost:3000/');
    cy.get('#email').type('joao@email.com');
    cy.get('#password').type('123456*aB');
    cy.get('.access-button').click();

    // Verifica se o login foi bem-sucedido redirecionando para a página principal
    cy.url().should('eq', 'http://localhost:3000/');

    // Teste de interação com Pet Ads
    cy.get('.pet-ad').should('exist');
    
    cy.get('.pet-ad').then(($ads) => {
      const randomIndex = Math.floor(Math.random() * $ads.length);
      
      cy.wrap($ads[randomIndex]).click();
      
      cy.get('.popup').should('be.visible');

      cy.get('.dropdown-btn').should('exist');
  
      cy.get('.dropdown-btn').click();
  
      cy.get('.dropdown-menu').should('be.visible');
  
      cy.contains('Denunciar').click();
  
      cy.get('.post-complaint-popup').should('be.visible');
  
      cy.get('.reason').type('Conteúdo inapropriado');
  
      cy.get('.submit-complaint').click();
      
      cy.get('.message').should('be.visible').contains('sucesso');

      cy.wait(1000);
  
      cy.get('.post-complaint-popup').should('not.exist');

    });
  });
});