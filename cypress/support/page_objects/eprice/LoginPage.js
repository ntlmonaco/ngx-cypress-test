export class LoginPage {

    /*
        riempio il form e accedo
    */
    fillForm(emailAddress, password, ricordami) {
        cy.get('#frmlogin #user').clear().type(emailAddress)
        cy.get('#frmlogin #pwd_in').clear().type(password)

        if (ricordami) {
            cy.get('#ricordami').click()
        }

        cy.contains('#frmlogin span.btn','ACCEDI').click()

        cy.get('strong.red').should('contain', 'Email o password non valida')
    }

    clickRegistratiGratis()  {
        cy.contains('a.btn span' , 'REGISTRATI GRATIS').click() 
    }
}

export const loginPage = new LoginPage()