Feature: Login Functionality

    Scenario: Scucessfull Login with valid credentials
        Given user is on login page
        When user enter username "standard_user"
        And user enter password "secret_souce"
        And user click on login button
        Then user should be able to see Inventory page


 # npx cucumber-js --tags @regression
 # npx cucumber-js --tags @regression AND @smoke
    @regression
    Scenario: Invalid login with  invalid credentials
        Given user is on login page
        When user enter username "invalid_user"
        And user enter password "wrong password"
        And user click on login button
        Then user should be able to see error message "Epic sadface: Username and password do not match any user in this service"


    @smoke
    Scenario Outline: Login with different User Credentials
        Given user is on login page
        When user enter username "<username>"
        And user enter password "<password>"
        And user click on login button
        Then user should be able to see success result "<result>"

    Examples: 
           | username           | password          | result                                                                    |
           | locked_out_user    | secret_sauce      | Epic sadface: Sorry, this user has been locked out.                       |
           | invalid_user       | invalid_password  | Epic sadface: Username and password do not match any user in this service |