Feature: Authentication - Login
  Background:
    Given the user is on the Login page

  Scenario: Successful login with valid admin credentials
    When the user enters "admin" as User Name and "password" as Password
    And the user clicks Sign In
    Then the user is redirected to "/Employee/Create"
    And no login error is displayed

  Scenario: Failed login with incorrect password
    When the user enters "admin" as User Name and "pasword" as Password
    And the user clicks Sign In
    Then the error message "Invalid login attempt." is displayed
    And the user remains on the login page

  Scenario: Failed login with missing credentials
    When the user submits the login form without User Name or Password
    Then the login form shows validation errors for required fields

  Scenario: Access control for protected pages
    Given the user is not authenticated
    When the user navigates to "/Employee/Create"
    Then the user is redirected to "/Account/Login"
    And the return URL parameter is set to "/Employee/Create"
