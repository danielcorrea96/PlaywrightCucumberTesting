Feature: Forgot Password
  Background:
    Given the user is on the Forgot Password page

  Scenario: Forgot password with valid email
    When the user enters a registered Email address
    And submits the form
    Then the application accepts the request and shows a confirmation or next step

  Scenario: Forgot password with invalid email
    When the user enters an invalid Email format
    Then the form shows an invalid email validation error
