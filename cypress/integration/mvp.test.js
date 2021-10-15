describe('Pizza testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
    const boxInput = cy.get('textarea[id=special-request]');
    const toppingsSelector = cy.get('input[id=toppings]:first');

    it('text box test', () => {
        boxInput().should('exist');
        boxInput().type('kenji').should('have.value', 'kenji');
    });

    it('can select multiple toppings', () => {
        toppingsSelector().next().check();
        toppingsSelector().next().next().check();
    });

    it('can submit', () => {
        
    })
})