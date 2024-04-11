
## Cat Adoption API

This is a Cat Adoption API built with [NestJS](https://nestjs.com/). 

## API Documentation

### Create .env file from .evn.example

```bash
$ cp .env.example .env
```

fill in the required fields in the .env file

## Installation

Install dependencies

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger documentation
 open [http://localhost:3000/api](http://localhost:3000/api) to view the swagger documentation ans test the endpoints


## Register first user
First registered user will have the role of admin

To register a user, send a POST request to [http://localhost:3000/auth/register](http://localhost:3000/auth/register) with the following payload

```json
{
    "email": "example@gmail.com",
    "password": "password"
}
```


