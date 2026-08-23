# Common Backgrounds (reference)

# Use this file as a reference for common Background steps such as logging in.
# Implement step definitions in your chosen BDD runner to reuse these backgrounds.

Background: Admin logged in
  Given the user is on the Login page
  When the user enters "admin" as User Name and "password" as Password
  And the user clicks Sign In
  Then the user should be authenticated
