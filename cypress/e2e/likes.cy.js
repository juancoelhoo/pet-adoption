describe('Sign-up and login flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('#email').type('joao@email.com');
    cy.get('#password').type('123456*aB');
    cy.get('.access-button').click();
  });

  describe('Sign-up page', () => {
    it('creates an account with valid inputs', () => {
      cy.visit('http://localhost:3000/signup');
      cy.get('#nome').type('Joao da Silva');
      cy.get('#email').type('joao@email.com');
      cy.get('#password').type('123456*aB');
      cy.get('#confirm-password').type('123456*aB');
      cy.get('.access-button').click();
    });
  });

  describe('Login page', () => {
    it('logs in with valid credentials', () => {
      cy.url().should('eq', 'http://localhost:3000/');
    });
  });

  describe('Pet Ads', () => {
    it('Clique em um PetAd Aleatório e curta-o', () => {
      cy.get('.pet-ad').should('exist');
      
      cy.get('.pet-ad').then(($ads) => {
        const randomIndex = Math.floor(Math.random() * $ads.length);
        
        cy.wrap($ads[randomIndex]).click();
        
        cy.get('.popup').should('be.visible');
        cy.get('.pet-likes button').should('exist');
      
        cy.get('.pet-likes button').invoke('attr', 'class').then((initialClass) => {
          cy.get('.pet-likes button').click();
  
          cy.get('.pet-likes button').should('have.class', 'postliked');
  
          cy.get('.pet-likes button').should('not.have.class', initialClass);
        });
      }); 
    });
  });
});
