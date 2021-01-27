
export class HomePage {

    closeCookieBanner() {
        cy.wait(1000)

        cy.log("Closing policy banner")
        cy.get('.iubenda-cs-close-btn').click()
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



        // div.w_navCat_new dl
        // devi fare in get di quello e poi un each per iterare su quelli

        // dentro l'each devi trovare con il wrap (forse) l'elemento che contiene il nome
        // logga ilnome con cy.log

        cy.get('div.w_navCat_new dl').each( ( quadratone, indice ) => {
            const nomeNellaPagina = quadratone.find('dt').text()
            const nomeNellArray = sectionNames[indice]

            expect(nomeNellaPagina).to.equal(nomeNellArray)

            cy.log("Nome sezione: ", nomeNellaPagina)
            cy.log("Index: ", indice)
            cy.log("Nome nell'array: ", nomeNellArray)
        })
    }

    /*
        Clicca sulla voce del menu
    */
    clickMenuItem(name){
        // TODO
    }
}

export const homePage = new HomePage()