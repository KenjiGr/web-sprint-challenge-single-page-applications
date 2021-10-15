describe('Pizza testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza');
    });
    const boxInput = () => cy.get('textarea[id=special-request]');
    const toppingsSelector = () => cy.get('input[type=checkbox]');
    const nameInput = () => cy.get('input[id=name-input]');
    const sauceInput = () => cy.get('input[id=sauce]:first');
    const sizeDrop = () => cy.get('select[id=size-dropdown]');
    const submitBtn = () => cy.get('button[id=order-button]');


    it('text box test', () => {
        boxInput().should('exist');
        boxInput().type('kenji').should('have.value', 'kenji');
    });

    it('can select multiple toppings', () => {
        toppingsSelector().next().check();
        toppingsSelector().next().next().check();
    });

    it('can submit', () => {
        nameInput().type('Kenji');
        sauceInput().click();
        sizeDrop().select(1);
        toppingsSelector().next().check();
        toppingsSelector().next().next().check();
        submitBtn().click();
    })
})