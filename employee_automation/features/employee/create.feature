Feature: Employee Creation
  Background:
    Given the user is logged in as admin
    And the user is on "/Employee/Create"

  Scenario: Create a new employee successfully
    When the user fills all fields with valid employee data
    And the user submits the form
    Then the user is redirected to "/Employee"
    And the new employee appears in the employee list when searched by Name and Email

  Scenario: Prevent employee creation with empty required fields
    When the user leaves Name, Age, Salary, or Email blank and submits the form
    Then validation errors are displayed for each missing required field
    And the employee is not created

  Scenario: Prevent employee creation with invalid data
    When the user enters invalid values such as negative Salary, invalid Email, or invalid Age
    Then the form displays validation errors
    And the employee is not created
