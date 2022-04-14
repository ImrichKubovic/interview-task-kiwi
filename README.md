# interview-task-kiwi
Kiwi task for an interview


Scenario: US nationality customer can add a travel insurance to his reservation.
Given US nationality customer is on booking page
When he select "Travel Plus" insurance
Then the insurance is added to the reservation


Scenario: US nationality customer can check insurance details and add it to the reservation
Given US nationality customer is on booking page
When he opens Travel Insurance details
Then he can add the travel insurance to his reservation.

Scenario: non-US nationality customer can add a travel insurance to his reservation.
Given non-US nationality customer is on booking page
When he select "Travel Plus" insurance
Then the insurance is added to the booking

Scenario: non-US nationality customer can add a travel insurance to his reservation.
Given non-US nationality customer is on booking page
When he select "Travel Basic" insurance
Then the insurance is added to the booking

Scenario: non-us nationality customer can compare the available travel insurances And add one to the reservation
Given non-US nationality customer is on booking page
When he opens Comparison and terms of the Travel insurace
Then he can add only one travel insurance to his reservation. 

Scenario: Customer can proceed with insurance: no travel insurance
Given Customer is on booking page
When he enters all required informations 
And he select "No insurance" travel insurance option
Then the is able to proceed to the next page. 

Scenario: Travel insurance is mandatory for all customers?
Given Customer is on booking page
When he enters all required informations 
And he don't select any travel insurance option
Then he is not able to proceed to the next page
And Error message appears to inform the customer.


There is also an option to add same insurance to more passangers so after all these test the main focus could be on that. 

For US nationality customers the travel insurance is not mandatory 
I assume it should be mandatory for all (they can select NO insurance option) 
So i think its a bug on the page for US customers.
