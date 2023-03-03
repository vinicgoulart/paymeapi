# Payme!
API of Payme!, made in Typescript. Payme is an app that reminds you of your payments! <br/>
This API was built using MongoDB, Typescript and ExpressJS!

## Routes
### Auth
-> POST to /register to sign up. <br />
-> POST to /login to sign in. <br />
-> GET to /logout to log out of your account. <br />

### Payments
-> GET to /payments/ to get all payments. <br />
-> GET to /payments/:id to get one payment. <br />
-> POST to /payments/ to create a new payment. <br />
-> PUT to /payments/:id to edit one payment. <br />
-> DELETE to /payments/:id to delete one payment. <br />

### User
-> GET to /user/ to get all users. <br />
-> DELETE to /user/destroy/:username to delete one user. <br />
-> PUT to /user/nickname to update current user's nickname. <br />
