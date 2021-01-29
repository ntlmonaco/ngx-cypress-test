export class PaginaRisultati {

    // Verifica che ogni prodotto ha un prezzo
    validaPrezziProdotti() {
        cy.get('div.ep_ScrollProd_products a').each( ( prodotto, indice) => {
            const tipoProdotto = prodotto.attr('title')
            cy.log("nome prodotto", tipoProdotto)
            cy.log("indice", indice)
    
            const prezzo = prodotto.find('div.ep_contPrice .ep_itemPrice').text()
            cy.log("prezzo ", prezzo)

            const lunghezzaStringaPrezzo = prezzo.length
            cy.log("prezzo lunghezza", lunghezzaStringaPrezzo)

            expect(lunghezzaStringaPrezzo).to.be.greaterThan(0)

            // expect(prodotto.get('div.ep_contPrice ins')).not.to.be.empty

            cy.get('div.ep_v_next span.ep_ico_nav').click({ force: true })
            
            cy.wait(1000)
        })
    }

    // Verifica che il checkbox funziona
    cliccaManufacturer(marcaProdotto)  {
        cy.contains('ul.ep_listFilter li', marcaProdotto)
            .find('.ep_customInput')
            .click({ force: true })
        cy.wait(1000)
    }
}

export const paginaRisultati = new PaginaRisultati()