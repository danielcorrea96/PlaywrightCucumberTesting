Feature: Pagination
  Background:
    Given the user is on the Employee list page

  Scenario: Navigate employee list pages
    When the user clicks page "2" in pagination
    Then the page updates to show the next set of employees

  Scenario: Pagination boundary behavior
    When the user clicks the highest available page number
    Then the page loads the last employee set successfully
