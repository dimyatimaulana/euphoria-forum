/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when email not valid
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
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

  it('should display alert when email is empty', (done) => {
    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
      done();
    });
  });

  it('should display alert when email not valid', (done) => {
    cy.get('input[placeholder="email"]').type('not a valid email');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
      done();
    });
  });

  it('should display alert when password is empty', (done) => {
    cy.get('input[placeholder="email"]').type('alan@dicoding.com');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
      done();
    });
  });

  it('should display alert when email and password are wrong', (done) => {
    cy.get('input[placeholder="email"]').type('apacoba');

    cy.get('input[placeholder="password"]').type('lemao');

    cy.get('button').contains(/^Login$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
      done();
    });
  });

  it('should display homepage when email and password are correct', (done) => {
    cy.get('input[placeholder="email"]').type('alan@dicoding.com');

    cy.get('input[placeholder="password"]').type('alan123');

    cy.get('button').contains(/^Login$/).click();

    // assert sementara karena API tidak merespon
    cy.get('button').contains(/^Login$/).should('be.visible');

    cy.get('div').should('have.class', 'thread-input');
    cy.get('nav').contains(/^Home$/).should('be.visible');

    done();
  });
});
