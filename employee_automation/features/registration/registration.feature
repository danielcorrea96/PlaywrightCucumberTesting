Feature: User Registration
  Background:
    Given the user is on the Register page

  Scenario: Successful registration with valid data
    When the user provides a unique Username, valid Email, valid Password, and matching Confirm Password
    And the user submits the form
    Then a new account is created or a success message is shown
    And the user can proceed to sign in

  Scenario: Registration with mismatched passwords
    When the user enters non-matching Password and Confirm Password
    Then the form displays a password mismatch error
    And the account is not created

  Scenario: Registration with weak password
    When the user enters a password that does not meet complexity rules
    Then the form displays a password strength or requirement error
    And the account is not created
