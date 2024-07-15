describe('Sign-up and login flow', () => {
  it('logs in and performs sign-up', () => {
    // Realiza o login uma vez antes de todos os testes
    cy.visit('http://localhost:3000/');
    cy.get('#email').type('eduardo@mail.com');
    cy.get('#password').type('123456*aB');
    cy.get('.access-button').click();

    // Verifica se o login foi bem-sucedido redirecionando para a página principal
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('logs in and report Pet Ads', () => {
    // Realiza o login uma vez antes de todos os testes
    cy.visit('http://localhost:3000/');
    cy.get('#email').type('eduardo@mail.com');
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

      cy.get('.profile-user').click();

      cy.get('.dropdown-btnp').should('exist');
  
      cy.get('.dropdown-btnp').click();
  
      cy.get('.dropdown-menup').should('be.visible');
  
      cy.wait(3000);

      cy.contains('Banir').click();

    });
  });
});