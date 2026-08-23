Feature: Search and Filter
  Background:
    Given the user is on the Employee list page

  Scenario: Search employees by name
    When the user enters a valid employee name and clicks Search
    Then the list returns rows containing that name

  Scenario: Search employees by email
    When the user enters a valid employee email and clicks Search
    Then the list returns rows containing that email

  Scenario: Filter employees by grade
    When the user selects "Senior" from Grade filter and clicks Search
    Then all returned rows have Grade "Senior"

  Scenario: Search returns no results
    When the user searches for a name or email that does not exist
    Then the table shows no employee rows or a no-results indicator
