Feature: Dashboard Analytics
  Background:
    Given the user is on "/Home/Dashboard"

  Scenario: Dashboard metrics load correctly
    When the page loads
    Then the dashboard displays total employees, average salary, average age, and monthly salary bill
    And the retirement planning alert shows counts for employees at retirement age

  Scenario: Dashboard refresh navigation
    When the user clicks "↻ Refresh"
    Then the dashboard reloads and preserves analytics content
