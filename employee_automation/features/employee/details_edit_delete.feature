Feature: Employee Details, Edit and Delete
  Background:
    Given the user is logged in as admin

  Scenario: View employee details
    When the user clicks "Details" for an employee row
    Then the employee detail page loads
    And the page includes employee profile fields and an "Edit" action

  Scenario: Edit employee successfully
    When the user selects "Edit" and updates one or more fields with valid values
    And saves the changes
    Then the updated values appear in the employee list and detail page

  Scenario: Prevent invalid edit updates
    When the user enters invalid data during edit
    Then the page shows validation errors
    And the changes are not saved

  Scenario: Delete employee successfully
    When the user clicks "Delete" for an employee row
    Then the employee record is removed from the list
    And searching for that employee returns no results
