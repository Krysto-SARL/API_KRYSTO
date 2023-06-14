# Krysto-go Backend API Specifications

Create the backend for a krysto-go app's. The frontend/UI will be created with React. The html/css template has been created and can be used as a reference for functionality. All of the functionality below needs to be fully implmented in this project.

### User
- List all partners in the database
   * Pagination
   * Select specific fields in result
   * Limit number of results
   * Filter by fields
- Search Partners by radius from zipcode
  * Use a geocoder to get exact location and coords from a single address field
- Get single Partner
- Create new Partner
  * Authenticated admin only
  * Must have the role "admin"
  * Field validation via Mongoose
- Upload a photo for Partner
  * admin only
  * Photo will be uploaded to local filesystem
- Update partners
  * Admin only
  * Validation on update
- Delete Partner
  * Admin only


### Collect Point
- List all collects for partner
- List all collects in general
  * Pagination, filtering, etc
- Get single collect
- Create new collect
  * Authenticated users only
  * Must have the role "partner" or "admin"
  * Only the owner or an admin can create a collect for a collect-point
  * Partner can create multiple collects
- Update collect
  * staff only
- Delete collect
  * Owner only


### Collect
- List all collects for partner
- List all collects in general
  * Pagination, filtering, etc
- Get single collect
- Create new collect
  * Authenticated users only
  * Must have the role "partner" or "admin"
  * Only the owner or an admin can create a collect for a collect-point
  * Partner can create multiple collects
- Update collect
  * staff or admin only
- Delete collect
  * Owner only
  


### Users & Authentication
- Authentication will be ton using JWT/cookies
  * JWT and cookie should expire in 30 days
- User registration
  * Register as a "staff" or "partner"
  * Once registered, a token will be sent along with a cookie (token = xxx)
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  * Cookie will be sent to set token = none
- Get user
  * Route to get the currently logged in user (via token)
- Password reset (lost password)
  * User can request to reset password
  * A hashed token will be emailed to the users registered email address
  * A put request can be made to the generated url to reset password
  * The token will expire after 10 minutes
- Update user info
  * Authenticated user only
  * Separate route to update password
- User CRUD
  * Admin only
- Users can only be made admin by updating the database field manually

## Security
- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public (for now)

## Documentation
- Use Postman to create documentation


## Deployment (Digital Ocean)
- Push to Github


## Code Related Suggestions
- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Validation using Mongoose and no external libraries
- Use async/await (create middleware to clean up controller methods)
- Create a database seeder to import and destroy data