import { homePage } from "../../support/page_objects/eprice/homePage"

describe('Eprice suite', () => {
    it('aggiungi al carrello test', () => {
        cy.visit('http://www.eprice.it')

        cy.wait(1000)

        // sono in home page
        homePage.closeCookieBanner()
        


        cy.get('.react-autosuggest__input').then(campoRicerca => {
            expect(campoRicerca).to.have.attr('placeholder', 'Cerca prodotto, categoria, marca...')
        })

        cy.get('#menu div.head_menu').should('have.length', 13)
        cy.get('div.w_navCat_new dl').should('have.length', 18)

        //verifico il Login
        cy.get('#logUser div.btn_head a').first().then(campoLogin => {
            expect(campoLogin).to.have.text('LOGIN')
        })

        cy.get('#logUser div.btn_head a').eq(1).then(campoAiuto=> {
            expect(campoAiuto).to.have.text('AIUTO')
        })

        cy.get('#iubFooterBtn').click()

        cy.get('#sa-suggestion .react-autosuggest__input').type('TV')

        cy.get('.ep_icoSearch').click()

        // sei in pagine risutlati
        cy.get('.ep_ScrollProd_scroller [sku="13615437"]').click()

        //expect(qta).to.have.value('1')

        // sono in pag dett prod
        // modifico la quantita'
        cy.get('.bottomBox #qta').clear().type('3')
        cy.get('.form_aggiungi_articolo a.add-to-basket-warranty').click()

        // cancella popup
        cy.get('#js_over_garanzia .closeOver').click()


        // sono nel carrello. cancello il prodotto
        cy.get('#sideFix a[href*="13615437"]')
            .parents('div')
            .find('p.rowQta .linkSub')
            .click()

        cy.wait(5000)

        // provo il primo dropdown


    })

    it.only('cataloghi test', ()=> {
        cy.visit('http://www.eprice.it')

        homePage.closeCookieBanner()
        homePage.validateCategoriesName()


        cy.wait(5000)
    })
})
