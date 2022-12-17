/// <reference types="cypress"/>

describe ('user handling', () => {
    it('Registers someone', () => {
        cy.visit('127.0.0.1:3000/register/')
        cy.get('input[name=username]').type("Student")

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${"Student"}`)

        cy.get('[type="radio"]').first().check()

        cy.get('form').submit()
        // we should be redirected to /login
        cy.url().then(url => {
            expect(url).to.equal('http://127.0.0.1:3000/login/')
        });

    })
    it('Logs someone in', () => {
        cy.visit('127.0.0.1:3000/login/')
        cy.get('input[name=username]').type("Student")

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${"Student"}{enter}`)

        // we should be redirected to /
        cy.url().then(url => {
            expect(url).to.equal('http://127.0.0.1:3000/')          });

    })
})
