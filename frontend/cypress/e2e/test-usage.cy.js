/// <reference types="cypress"/>

describe ('user handling', () => {
    it('Registers someone', () => {
        cy.visit('127.0.0.1:3000/register/')
        
        cy.get('input[name=username]').type("Teacher")

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${"Teacher"}`)

        cy.get('[type="radio"]').eq(1).check()

        cy.get('form').submit()
        // we should be redirected to /login
        cy.url().should('eq', 'http://127.0.0.1:3000/login/')

    })
    it('Logs someone in', () => {
        cy.visit('127.0.0.1:3000/login/')
        cy.get('input[name=username]').type("Teacher")

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${"Teacher"}`)

        cy.get('form').submit()
        // we should be redirected to /
        cy.url().should('eq', 'http://127.0.0.1:3000/')

    })
    it('Logs someone out', () => {
        cy.visit('127.0.0.1:3000/login/')
        cy.get('input[name=username]').type("Teacher")

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${"Teacher"}{enter}`)
        
        cy.get('button[name=logout]').click()

        // we should be redirected to /
        cy.url().should('eq', 'http://127.0.0.1:3000/login/')

    })
})
