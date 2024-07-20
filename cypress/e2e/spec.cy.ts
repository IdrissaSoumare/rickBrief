describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('[data-test-id="button-to-pick-a-card"]').should('be.visible').click();
    cy.get('h1').contains('Rick Challenge').click();
    cy.get('.card-image').should('be.visible');
  });
});
