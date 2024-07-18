## Description

Backend service for User crendentials module

## Functionalities

- User can signup using `/users/signup` route
    - Accepts email, name & password
    - Added server side validations for password by following guidelines
        - Minimum length of 8 characters
        - Contains at least 1 letter.
        - Contains at least 1 number.
        - Contains at least 1 special character.
    - Password will be encrypted before saving to db
- User can signin using `/users/signin` route
- User can access their details by using `/users/profile` protected route

 
## Installation

```bash
$ npm install
```

## Running the app

```bash
# start application
$ npm run start
```

- Backend server will be run on `http://localhost:3000`
