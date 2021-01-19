/// <reference types="cypress" />

// const { eq } = require("cypress/types/lodash")

describe('Our first suite', () => {

  it('first test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //by Tag Name
    cy.get('input')

    //by ID
    cy.get('#inputEmail1')

    //Class Name
    cy.get('.input-full-width')

    //by Attribute name
    cy.get('[placeholder')

    //by Attribute name and value
    cy.get('[placeholder="Email"]')

    //by Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by Tag name and Attribute with value
    cy.get('input[placeholder=Email]')

    //by two different attributes
    cy.get('[placeholder="Email"][type="email"]')

    //by Tag name, Attribute with value, ID and Class name
    cy.get('input[placeholder=Email]#inputEmail1.input-full-width')

    //The most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]')
  })

  it('second test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')

    cy.contains('Sign in')
    cy.contains('[status="warning"]', 'Sign in')

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
  })

  it('then and wrap methods', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //cypress style
    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(passwordLabelFirst).to.equal(passwordSecondText)

        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
      })
    })
  })

  it('invoke command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address')
    })

    //3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address')
    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      //.should('contain','checked')
      .then(classValue => {
        expect(classValue).to.contain('checked')
        expect(classValue).to.contain('checked')
      })
  })

  it.only('assert property', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    let date = new Date()
    date.setDate(date.getDate() + 90)

    let futureDay = date.getDate()
    let futureMonth = date.toLocaleString('en-GB', {month: 'short'})

    let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
    cy.log('Date assert', dateAssert)

    cy.log('future day', futureDay)
    cy.log('future month', futureMonth)

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      selectDayFromCurrent()


      function selectDayFromCurrent() {
        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.log("Clicco next month")
            cy.get("[data-name='chevron-right']").click()
    
            selectDayFromCurrent()
          } else {
            let regExp = new RegExp("^" + futureDay +"$")
            cy.get('nb-calendar-day-picker nb-calendar-day-cell').contains(regExp).click()
          }
        })
      }

      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
  })
})

  it('radio button', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layout').click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons)
        .first()
        .check({ force: true })
        .should('be.checked')

      cy.wrap(radioButtons)
        .eq(1)
        .check({ force: true })

      cy.wrap(radioButtons)
        .first()
        .should('not.be.checked')

      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')
    })
  })

  it('check boxes', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()
    cy.get('[type="checkbox"]').eq(0).click({ force: true })
  })

  it('lists and dropdowns', () => {
    const colors= {
      "Light": "rgb(255, 255, 255)",
      "Dark": "rgb(34, 43, 69)",
      "Cosmic": "rgb(50, 50, 89)",
      "Corporate": "rgb(255, 255, 255)"
    }

    cy.visit('/')

    //1
    cy.get('nav nb-select').click()
    cy.get('.options-list').contains('Dark').click()
    cy.get('nav nb-select button').should('contain','Dark')
    cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    cy.log("Inio la parte 2")

    //2
    cy.get('nav nb-select').then( dropdown =>  {
      cy.wrap(dropdown).click()
      cy.get('.options-list nb-option').each( (listItem, index) => {
        cy.log("******* Nuovo loop")

        const itemText = listItem.text().trim()

        cy.log("Item text ", itemText)
        cy.log("Index ", index)

        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
        // if( index < 3 ){
          cy.wrap(dropdown).click()
        // }
      })
    })
  })

  it('Web tables', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //1
    cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    })

    //2
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then( tableRow =>  {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').first().find('td').then( tableColumns => {
      cy.wrap(tableColumns).eq(2).should('contain', 'Artem')
      cy.wrap(tableColumns).eq(3).should('contain','Bondar')
    })

    //3
    const age = [7, 20, 30, 40, 200]

    cy.wrap(age).each( (age, index) => {
      cy.log('Age', age)
      cy.log('Index ', index)

      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500)
      cy.get('tbody tr').each( tableRow => {
        if(age == 200){
          cy.wrap(tableRow).should('contain', 'No data found')
        } else { 
          cy.wrap(tableRow).find('td').eq(6).should('have.text', age)
        }
      })
    })
  })  

  it('tooltip', ()  => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('nb-card', 'Colored Tooltips')
      .contains('Default').click()

    cy.get('nb-tooltip').should('contain','This is a tooltip')

  })

})
