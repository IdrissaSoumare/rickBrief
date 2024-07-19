describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Rick Challenge');
  });

  it('Vérifie que le bouton affiche bien un élément', () => {
    cy.visit('/');

    // Clique sur le bouton pour afficher/cacher la div
    cy.get('button').contains('Clic...').click();

    // Vérifie que l'image et les paragraphes sont visibles après le clic
    cy.get('.card-image').should('be.visible');
    cy.get('.custom-card-content p').should('have.length', 4); // Vérifie qu'il y a 4 paragraphes dans custom-card-content
  });

  it('Vérifie si le timer est de 5 secondes', () => {
    cy.visit('/');

    // Vérifie que le bouton est activé au début
    cy.get('button').contains('Clic...').should('not.be.disabled');

    // Clique sur le bouton pour désactiver
    cy.get('button').contains('Clic...').click();

    // Vérifie que le bouton est désactivé après le clic
    cy.get('button').contains('Clic...').should('be.disabled');

    // Attendre 1 seconde pour que le délai commence à diminuer
    cy.wait(1000);

    // Vérifie que le message de délai est correctement affiché
    cy.get('.custom-card-footer').contains('Vous devez attendre : 0m 4s').should('be.visible');

    // Attendre 4 secondes supplémentaires pour que le délai soit de 5 secondes au total
    cy.wait(4000);

    // Vérifie que le message de délai est maintenant à 0m 0s
    cy.get('.custom-card-footer').contains('Vous devez attendre : 0m 0s').should('be.visible');

    // Vérifie que le bouton est à nouveau activé après le délai
    cy.get('button').contains('Clic...').should('not.be.disabled');
  });
});
