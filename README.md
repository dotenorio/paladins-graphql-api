# Paladins GraphQL API

A wordefull GraphQL API to get any data from [Hirez Paladins API](https://docs.google.com/document/d/1OFS-3ocSx-1Rvg4afAnEHlT3917MAK_6eJTR6rzr-BM/edit#).

## Demo

Access https://paladins-graphql-api.dotenorio1.now.sh/ to see online demo.

## How to configure locally

Please clone this repository and install dependencies:
```
$ git clone https://github.com/dotenorio/paladins-graphql-api.git
$ cd paladins-graphql-api
$ yarn
```

Configure the environment variables:
```
- Open the file .env.example in any editor
- Change value of parameters
  - PALADINS_API_URL
  - PALADINS_DEV_ID
  - PALADINS_AUTH_KEY
- Save as .env
```
_**IMPORTANT:** if you don't have a api access, you can request [here](https://fs12.formsite.com/HiRez/form48/secure_index.html)!_

After this, start the dev enviroment:
```
$ yarn dev
```

Now, open the link http://localhost:4000/ in the browser and _voìla_. You can do **queries**, see **schema** and the **documentation**.

## Available Methods

* ping
* createSession
* testSession
* getUser
* _Other methods in progress..._

## Postman

If you use postman, you can use this:
https://www.getpostman.com/collections/522977fed03462c851df