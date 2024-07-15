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

      cy.get('.dropdown-btn').should('exist');
  
      cy.get('.dropdown-btn').click();
  
      cy.get('.dropdown-menu').should('be.visible');
  
      cy.wait(3000);

      cy.contains('Excluir').click();
      
      cy.wait(3000);

      cy.on('window:alert', (text) => {
        expect(text).to.equal('Post deleted successfully.'); // Substitua pelo texto esperado no alerta
      });

    });
  });
});