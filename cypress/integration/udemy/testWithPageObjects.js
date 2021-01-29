import { onFormLayoutsPage } from "../../support/page_objects/formLayoutsPage"
import { navigateTo } from "../../support/page_objects/navigationPage"

describe('Test with Page Objects', () => {
    beforeEach('open application',  () =>  {
        cy.openHomePage()
    })

    it('verify navigation across the pages', ()  => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()
    })

    it('should submit inline and basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', 'test@test.com')
    })
})
