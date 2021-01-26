describe('Eprice suite', () => {
    it('aggiungi al carrello test', () => {
        cy.visit('http://www.eprice.it')

        cy.wait(5000)

        cy.get('.iubenda-cs-cookie-policy-lnk').click()

        cy.get('#iubFooterBtn').click()

        cy.get('.react-autosuggest__input').type('TV')

        cy.get('.ep_icoSearch ').click()

        cy.get('.ep_ScrollProd_scroller [sku="13615437"]').click()

        // modifico la quantita'
        cy.get('.bottomBox #qta ').clear().type('3')

        cy.get('.form_aggiungi_articolo a.add-to-basket-warranty').click()


        // cancella popup
        cy.get('#js_over_garanzia .closeOver').click()

        cy.get('p.rowQta .linkSub').click()

        cy.wait(5000)


    })

   


})