# EAEmployee BDD Test Plan

## 1. Test Plan Overview

This test plan uses Behavior-Driven Development (BDD) style scenarios to verify EAEmployee's authentication, employee management, search, filtering, pagination, detail viewing, editing, deletion, and dashboard analytics.

## 2. Authentication Scenarios

### Scenario: Successful login with valid admin credentials
- Given the user is on the Login page
- When the user enters `admin` as User Name and `password` as Password
- And the user clicks Sign In
- Then the user is redirected to `/Employee/Create`
- And no login error is displayed

### Scenario: Failed login with incorrect password
- Given the user is on the Login page
- When the user enters `admin` as User Name and `pasword` as Password
- And the user clicks Sign In
- Then the error message `Invalid login attempt.` is displayed
- And the user remains on the login page

### Scenario: Failed login with missing credentials
- Given the user is on the Login page
- When the user submits without a User Name or Password
- Then the login form shows validation errors for required fields

### Scenario: Access control for protected pages
- Given the user is not authenticated
- When the user navigates to `/Employee/Create`
- Then the user is redirected to `/Account/Login`
- And the return URL parameter is set to `/Employee/Create`

## 3. Registration Scenarios

### Scenario: Successful registration with valid data
- Given the user is on the Register page
- When the user provides a unique Username, valid Email, valid Password, and matching Confirm Password
- And the user submits the form
- Then a new account is created or a success message is shown
- And the user can proceed to sign in

### Scenario: Registration with mismatched passwords
- Given the user is on the Register page
- When the user enters matching Username and Email but non-matching Password and Confirm Password
- Then the form displays a password mismatch error
- And the account is not created

### Scenario: Registration with weak password
- Given the user is on the Register page
- When the user enters a password that does not meet complexity rules
- Then the form displays a password strength or requirement error
- And the account is not created

## 4. Forgot Password Scenarios

### Scenario: Forgot password with valid email
- Given the user is on the Forgot Password page
- When the user enters a registered Email address
- And submits the form
- Then the application accepts the request and shows a confirmation or next step

### Scenario: Forgot password with invalid email
- Given the user is on the Forgot Password page
- When the user enters an invalid Email format
- Then the form shows an invalid email validation error

## 5. Create Employee Scenarios

### Scenario: Create a new employee successfully
- Given the user is logged in as admin
- And the user is on `/Employee/Create`
- When the user fills all fields with valid employee data
- And the user submits the form
- Then the user is redirected to `/Employee`
- And the new employee appears in the employee list when searched by Name and Email

### Scenario: Prevent employee creation with empty required fields
- Given the user is on `/Employee/Create`
- When the user leaves Name, Age, Salary, or Email blank
- And submits the form
- Then validation errors are displayed for each missing required field
- And the employee is not created

### Scenario: Prevent employee creation with invalid data
- Given the user is on `/Employee/Create`
- When the user enters invalid values such as negative Salary, invalid Email, or invalid Age
- Then the form displays validation errors
- And the employee is not created

## 6. Search & Filter Scenarios

### Scenario: Search employees by name
- Given the user is on the Employee list page
- When the user enters a valid employee name
- And clicks Search
- Then the list returns rows containing that name

### Scenario: Search employees by email
- Given the user is on the Employee list page
- When the user enters a valid employee email
- And clicks Search
- Then the list returns rows containing that email

### Scenario: Filter employees by grade
- Given the user is on the Employee list page
- When the user selects `Senior` from Grade filter
- And clicks Search
- Then all returned rows have Grade `Senior`

### Scenario: Search returns no results
- Given the user is on the Employee list page
- When the user searches for a name or email that does not exist
- Then the table shows no employee rows or a no-results indicator

## 7. Pagination Scenarios

### Scenario: Navigate employee list pages
- Given the user is on the Employee list page
- When the user clicks page `2` in pagination
- Then the page updates to show the next set of employees

### Scenario: Pagination boundary behavior
- Given the user is on the Employee list page
- When the user clicks the highest available page number
- Then the page loads the last employee set successfully

## 8. Employee Details / Edit / Delete Scenarios

### Scenario: View employee details
- Given the user is logged in
- When the user clicks `Details` for an employee row
- Then the employee detail page loads
- And the page includes employee profile fields and an `Edit` action

### Scenario: Edit employee successfully
- Given the user is on an employee detail page
- When the user selects `Edit`
- And updates one or more fields with valid values
- And saves the changes
- Then the updated values appear in the employee list and detail page

### Scenario: Prevent invalid edit updates
- Given the user is editing an employee
- When the user enters invalid data
- Then the page shows validation errors
- And the changes are not saved

### Scenario: Delete employee successfully
- Given the user is on the Employee list page
- When the user clicks `Delete` for an employee row
- Then the employee record is removed from the list
- And searching for that employee returns no results

## 9. Dashboard Scenarios

### Scenario: Dashboard metrics load correctly
- Given the user is on `/Home/Dashboard`
- When the page loads
- Then the dashboard displays total employees, average salary, average age, and monthly salary bill
- And the retirement planning alert shows counts for employees at retirement age

### Scenario: Dashboard refresh navigation
- Given the user is on the dashboard page
- When the user clicks `↻ Refresh`
- Then the dashboard reloads and preserves analytics content

## 10. Edge Cases

- Attempt access to create/edit/delete pages without authentication and verify redirect to login
- Submit login with blank username or password
- Submit registration with mismatched password confirmation
- Submit registration with weak password
- Create employee with:
  - blank Name or Email
  - non-numeric Age, Salary, Duration Worked
  - negative Salary or Duration Worked
  - age values outside realistic range
  - malformed email
- Search for exact, partial, and case-insensitive matches
- Filter by grade when no employees exist for that grade selection
- Delete the last result on a page and ensure pagination updates correctly
- Verify `Details` page cannot be reached without authentication
- Confirm the app gracefully handles invalid employee IDs in the URL
- Confirm session persistence behavior when `Keep me signed in` is toggled

## 11. Test Data Examples

### Login
- Valid admin user:
  - Username: `admin`
  - Password: `password`
- Invalid credentials:
  - Username: `admin`, Password: `pasword`
  - Username: `wronguser`, Password: `password`

### Employee create/edit sample data
- Name: `Test User`
- Age: `32`
- Salary: `7500`
- Duration Worked: `24`
- Grade: `Middle`
- Email: `test.user+1@work.io`

### Register sample data
- Username: `newtester`
- Email: `newtester@example.com`
- Password: `Aa1!Test`
- Confirm Password: `Aa1!Test`

## 12. Deliverables

- BDD test case scenarios covering happy paths and edge cases
- Test plan scope for UI validation, forms, search, pagination, and CRUD operations
- Observed login behavior with actual working credentials
