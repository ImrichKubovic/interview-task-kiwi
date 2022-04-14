describe ("Task for Kiwi's interview",()=>{
    beforeEach('Obtain booking token', () => {
        
        cy.setCookie('__kwc_agreed', 'true')
        localStorage.setItem('DISABLE_REVOLUT_EXIT_MODAL', 'true')
        window.open
        cy.request({
             url:Cypress.env('flights_api'),
             qs:{
                 partner:'cypress',
                 fly_from: 'VIE',
                 fly_to: 'OSL'
             }
         }) 
         .then(response=>{  
            cy.log(response.body.data[0].booking_token)
            const flights = response.body.data
            const selectedFlight = flights[0]
            cy.visit({
            url:Cypress.env('booking_api'),
            qs:{
                  token: selectedFlight.booking_token
             }
            })
         })
         
    })
    afterEach('Clear session', ()=>{
        cy.reload()
        cy.clearLocalStorage() 
    })
           
    it("US nationality customer can add a travel insurance to his reservation",()=>{
        cy.get("[data-test=ReservationPassenger-nationality]").select('us')
        cy.get("[data-test=plus]").click({force: true})
        cy.get("[data-test=bookingBillInsurance]")
            .should('be.visible')
            .and('contains.text', 'Travel insurance') 
    })

    it("US nationality customer can check insurance details and add it to the reservation", ()=>{
        cy.get("[data-test=ReservationPassenger-nationality]").select('us')
        cy.get('div').contains("Insurance details").click()
        cy.get("[data-test=addInsuranceBtn").click()
        cy.get("[data-test=bookingBillInsurance]")
            .should('be.visible')
            .and('contains.text', 'Travel insurance') 
    })
    it("non-US nationality customer can add a travel insurance to his reservation or change it",()=>{
        cy.get('input[value="plus"]').click({ force: true })
        cy.get("[data-test=bookingBillInsurance]")
            .should('be.visible')
            .and('contains.text', 'Travel insurance') 
        cy.get('a').contains('Change').click()
        cy.get('input[value="basic"]').click({ force: true })
        cy.get("[data-test=bookingBillInsurance]")
        .should('be.visible')
        .and('contains.text', 'Travel insurance') 
    })
    it("Non-us nationality customer can compare the available travel insurances And add one to the reservation",()=>{
        cy.get("[data-test=ReservationPassengerInsurance-head-infoButton]").click()
        cy.get("[data-test=plus-modalButton]").first().click()
        cy.get("[data-test=bookingBillInsurance]")
        .should('be.visible')
        .and('contains.text', 'Travel insurance') 
    })
    it(" US Customer can proceed with insurance: no travel insurance",()=>{
        fillCustomerDataUs()
        cy.get('[data-test=none]').click({force: true})
        cy.get('[data-test=StepControls-passengers-next]').click()
        cy.get('[data-test=fare-types-step]').should('be.visible')
        cy.url().should('include','activeStep=1')
    })
    it("Customer can proceed with insurance: no travel insurance",()=>{
        fillCustomerData()
        cy.get('input[value="none"]').click({force: true})
        cy.get('[data-test=StepControls-passengers-next]').click()
        cy.get('[data-test=fare-types-step]').should('be.visible')
        cy.url().should('include','activeStep=1')
    })
    
    it("Travel insurance is mandatory for Non-US customers",()=>{
        fillCustomerData()
        cy.get('[data-test=StepControls-passengers-next]').click()
        cy.get('[data-state="error"]').should('be.exist')
    })

    it("Travel insurance is mandatory for US customers",()=>{
        fillCustomerDataUs()
        cy.get('[data-test=StepControls-passengers-next]').click()
        cy.get('[data-state="error"]').should('be.exist')
    })


function fillCustomerDataUs() {
        cy.get('input[name="email"]').type("imrajs@imrajs.com")
        cy.get('[data-test=contact-phone]').type('908028466')
        cy.get('input[name="firstname"]').type("Imrich")
        cy.get('input[name="lastname"]').type("Imrich")
        cy.get("[data-test=ReservationPassenger-nationality]").select('us')
        cy.get('Select').eq(3).select("mr")
        cy.get("[data-testid=day]").type('12')
        cy.get("[data-testid=month]").select('04')
        cy.get("[data-testid=year]").type('1988')
        cy.get("[data-test=BaggagePickerNewDesign-Option-0]").click()
        cy.get("[data-test=BaggagePickerNewDesign-NoBagsToCheckIn]").click({ force: true })
}

function fillCustomerData() {
    cy.get('input[name="email"]').type("imrajs@imrajs.com")
    cy.get('[data-test=contact-phone]').type('908028466')
    cy.get('input[name="firstname"]').type("Imrich")
    cy.get('input[name="lastname"]').type("Imrich")
    cy.get("[data-test=ReservationPassenger-nationality]").select('hu')
    cy.get('Select').eq(3).select("mr")
    cy.get("[data-testid=day]").type('12')
    cy.get("[data-testid=month]").select('04')
    cy.get("[data-testid=year]").type('1988')
    cy.get("[data-test=BaggagePickerNewDesign-Option-0]").click()
    cy.get("[data-test=BaggagePickerNewDesign-NoBagsToCheckIn]").click({ force: true })
}})
