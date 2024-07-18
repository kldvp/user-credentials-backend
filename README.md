## Description

Backend service for User crendentials module

## Installation

Clone repo by using following command

```
git clone https://github.com/kldvp/user-credentials-backend.git
```

Install dependencies by using following command

```bash
$ npm install
```

## ENV setup

- Create `.env` file in project root directory
- Provide values for fields as mentioned in `.env.sample`


## Running the app

```bash
# start application
$ npm run start
```

- Backend server will be run on `http://localhost:3000`

## Functionalities

- User can signup using `/users/signup` route
    - Accepts email, name (optional) & password
    - Added server side validations for password by following guidelines
        - Minimum length of 8 characters
        - Contains at least 1 letter.
        - Contains at least 1 number.
        - Contains at least 1 special character.
    - Password will be encrypted before saving to db
- User can signin using `/users/signin` route
    - Email & password must be registered before signin
- User can access their details by using `/users/profile` protected route
    - Only authenticated user can see their details
- Added CORS, only specified origins can access resources from this server.
