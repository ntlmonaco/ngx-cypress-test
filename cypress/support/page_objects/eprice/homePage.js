export class HomePage {

    /* Chiude il banner dei cookie */
    closeCookieBanner() {
        cy.wait(1000)

        cy.log("Closing policy banner")
        cy.get('.iubenda-cs-close-btn').click()
    }

    closeModaleCookie() {
        cy.wait(5000)
        cy.get('button#onetrust-accept-btn-handler').click()
    }

    // Clicca sul link 'LOGIN'
    clickLogin() {
        cy.contains('#logUser div.btn_head a', 'LOGIN').click()
    }

    /* Verifica che ogni Consigiliato da noi ha un'immagine */
    validateImagesInConsigliatiDaNoi() {
        // cerco il locator per ogni prodotto 
        // per ogni <a href ci deve essere una class ep_prodImg
      
       cy.get('[data-title="Consigliati da noi"] .ep_prodListing').each( ( prodotto, indice ) => {
            const nomeProdotto = prodotto.attr('title');
            cy.log("Nome prodotto", nomeProdotto)

            cy.wrap(prodotto).find('span.ep_prodImg img').should('have.attr', 'src')

            cy.get('[data-title="Consigliati da noi"] div.v_next').click()
            cy.wait(1000)
       })
    }

    /*
        Inserisce il testo da cercare e preme sulla lentina
    */
    cercaProdotto(nomeProdotto) {
        cy.get('#sa-suggestion .react-autosuggest__input').type(nomeProdotto)
        cy.get('.ep_icoSearch').click()
    }

    // verifico che si aprano le voci Login e Aiuto
    validateLogIneAiuto()  {
        cy.get('#logUser div.btn_head a').first().then(campoLogin => {
            expect(campoLogin).to.have.text('LOGIN')
        })

        cy.get('#logUser div.btn_head a').eq(1).then(campoAiuto=> {
            expect(campoAiuto).to.have.text('AIUTO')
        })
    }

    /*
        Verifica che ogni categoria ha il nome giusto
    */
    validateCategoriesName() {
        const sectionNames = [
            "Grandi Elettrodomestici",
            "Piccoli elettrodomestici",
            "Arredamento",
            "Informatica",
            "Tv e Home cinema",
            "Condizionatori",
            "Telefonia e Mobile",
            "Audio e musica",
            "Casalinghi",
            "Videogiochi",
            "Salute e igiene",
            "Brico e giardinaggio",
            "Giocattoli",
            "Beauty e cure del corpo",
            "Sport e outdoor",
            "Prima infanzia",
            "Ufficio, scuola e cartoleria",
            "Altre categorie",
        ]

        cy.log("Validating categories name")

        cy.get('div.w_navCat_new dl').each( ( quadratone, indice ) => {
            const nomeNellaPagina = quadratone.find('dt').text()
            const nomeNellArray = sectionNames[indice]

            expect(nomeNellaPagina).to.equal(nomeNellArray)

            cy.log("Nome sezione: ", nomeNellaPagina)
            cy.log("Index: ", indice)
            cy.log("Nome nell'array: ", nomeNellArray)
        })
    }
}

export const homePage = new HomePage()