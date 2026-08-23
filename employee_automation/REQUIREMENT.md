# EAEmployee Product Requirements

## 1. Product Overview

EAEmployee is an employee management web application with core functionality for authentication, employee record creation, search, detail viewing, editing, deleting, and analytics.

The primary business goal is to allow administrators to manage employee records and review workforce analytics while protecting sensitive management actions behind authenticated access.

## 2. Scope

The product requirements cover the following application areas:
- Authentication: login, register, forgot password
- Employee management: create, read, update, delete
- Search and filter operations on the employee list
- Detail and analytics pages
- Pagination and navigation
- Validation and edge cases

## 3. Observed UI Modules & Routes

### Public / Home
- `/` — public landing page with navigation links
- `/Account/Login` — login page
- `/Account/Register` — registration page
- `/Account/ForgotPassword` — password recovery page
- `/Home/Dashboard` — workforce dashboard analytics page
- `/Employee` — employee list page

### Authenticated / Employee Management
- `/Employee/Create` — create employee page (requires login)
- `/EmployeeDetails/Index/{id}` — employee detail page (requires login)
- `/Employee/Edit/{id}` — edit employee page (requires login)
- `/Employee/Delete/{id}` — delete employee operation (requires login)

## 4. Authentication Requirements

### Login
- User must provide `User Name` and `Password`
- Valid credentials redirect to `/Employee/Create`
- Invalid credentials show `Invalid login attempt.`
- Authentication is required for create/edit/delete and detail pages
- Login page includes `Keep me signed in` checkbox

### Registration
- Register page includes:
  - `Username`
  - `Email Address`
  - `Password`
  - `Confirm Password`
- Password rule shown: `Min 6 characters with uppercase, number & special char.`
- Account registration should return success or show validation errors

### Forgot Password
- Forgot Password page accepts an email address for recovery
- Form should show validation for required email

## 5. Employee CRUD Requirements

### Create Employee
- Fields expected on create page:
  - Name
  - Age
  - Salary
  - Duration Worked
  - Grade
  - Email
- Grade options observed: `Junior`, `Middle`, `Senior`, `C-Level`
- Successful submit should return to `/Employee`
- Form validation should reject invalid or missing values

### Employee List
- Employee list page includes search fields:
  - Search by name
  - Search by email
  - Grade filter
- Table columns:
  - Name
  - Age
  - Salary
  - Duration Worked (months)
  - Grade
  - Email
  - Actions
- Actions on each row include `Details`, `Edit`, and `Delete`
- Pagination controls are present and should navigate through result pages

### Employee Details
- Detail view shows the employee record and should show `Edit` action when authenticated
- Unauthorized access must redirect to login

### Edit Employee
- Editing a record should allow updates to employee fields and save changes
- Validation applies in the same way as creation

### Delete Employee
- Delete action should remove the employee record from the list
- Verify that after deletion the record is no longer searchable or visible

## 6. Observed Workflows & Access Behavior

- Direct access to `/Employee/Create` redirects unauthenticated users to login
- Direct access to `/EmployeeDetails/Index/{id}` redirects unauthenticated users to login
- Dashboard and employee list are accessible without a successful admin login, but detailed edit/delete actions require authentication
- The provided admin login credential in the app is:
  - Username: `admin`
  - Password: `password`
- The app shows `Invalid login attempt.` when incorrect credentials are used

## 7. Notes and Assumptions

- The app currently redirects unauthenticated users to login for protected employee creation and details pages.
- The application displays validation helper text on the registration page, indicating password complexity rules.
- The app uses ASP.NET Core Identity and appears to require a working username/password combination for admin actions.
- Because the UI exposes `Edit` and `Delete` in the employee list only after login, these are treated as protected CRUD operations.
- If the app is updated later, the requirements should be revised to include any new or changed workflows.
