Feature: Product Functionality

    Background:
            Given user is logged in with valid credentials
        
        Scenario: Verify Products are displayed on inventory page
            Then user snoulde able to see the atleast one product on the page


        Scenario: add a product to cart
            When user add :"Sauce Labs Backpack" to the cart
            Then the cart badge should show "1" item


        Scenario: Sort the products by price low to high
        When user sort products by "Price (low to high)"
        Then the first product price should be lowest
