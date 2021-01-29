import { homePage } from "../../support/page_objects/eprice/HomePage"
import { loginPage } from "../../support/page_objects/eprice/loginPage"
import { paginaRisultati } from "../../support/page_objects/eprice/PaginaRisultati"
import { registratiPage } from "../../support/page_objects/eprice/RegistratiPage"

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

    it('cataloghi test', ()=> {
        cy.visit('http://www.eprice.it')

        homePage.closeCookieBanner()
        // homePage.validateCategoriesName()
        // homePage.validateImagesInConsigliatiDaNoi()
        homePage.cercaProdotto('TV')

        cy.wait(5000)

        // paginaRisultati.validaPrezziProdotti()
        paginaRisultati.cliccaManufacturer('Samsung')
        paginaRisultati.cliccaManufacturer('Lg')
    })


    /*
        WHEN: inserisco usename e password errati nella pagina login
        THEN: Errore 'emai l o password non valida'
    */
    it('login fallito test', ()=> {
        cy.visit('http://www.eprice.it')

        // siamo in home page
        homePage.closeModaleCookie()
        homePage.clickLogin()

        // siamo in Login Page
        loginPage.fillForm('fake@email2','fakepassword2', true)
    })

})
