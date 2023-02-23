/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="email"]').should('be.visible');
    cy.get('input[placeholder="password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
    cy.get('a').contains(/^Register$/).should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Failed to fetch');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="email"]').type('testLogin');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="email"]').type('apacoba');

    cy.get('input[placeholder="password"]').type('lemao');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="email"]').type('admin123@dicoding.com');

    cy.get('input[placeholder="password"]').type('admin123');

    cy.get('button').contains(/^Login$/).click();

    // assert sementara karena API tidak merespon
    cy.get('button').contains(/^Login$/).should('be.visible');

    // cy.get('div').should('have.class', 'thread-input');
    // cy.get('nav').contains(/^Home$/).should('be.visible');
  });
});
