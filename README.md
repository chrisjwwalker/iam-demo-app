[![Apache-2.0 license](http://img.shields.io/badge/license-Apache-brightgreen.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)

iam-demo-app
============

## How to run
Built using Typescript & NodeJS on node version 12.16.1

Duplicate `.env.sample` as `.env`. Amend the values based on your identity provider and registered application. 

Install the dependencies
```shell script
yarn install
```

Build the app
```shell script
yarn build
```

This runs the frontend app on port 8000
```shell script
yarn dev-app
```

This runs the api on port 8008
```shell script
yarn dev-api
```

Start the frontend app on port 8000 in prod mode
```shell script
yarn start-app
```

Start the api on port 8008 in prod mode
```shell script
yarn start-api
```

## Routes: Frontend
|           Path          | Supported Methods |                            Description                          |
| ------------------------| ------------------| --------------------------------------------------------------- |
|  /iam-demo/home         |       GET         | Root url of the frontend. Displays login screen                 |
|  /iam-demo/login        |       GET         | Redirects user to to MS login                                   |
|  /iam-demo/redirect     |       GET         | Redirect used by auth server, receives auth code                |
|  /iam-demo/weather-for  |       GET         | Gets fake weather data for a particular region                  | 

#### GET /iam-demo/weather-for

##### Query parameters
|       key        |       value      |
|------------------|------------------|
|      locale      |    some-string   | 


## Routes: API
|           Path          | Supported Methods |                                  Description                                    |
| ------------------------| ------------------| --------------------------------------------------------------------------------|
|  /iam-demo/api/weather  |       GET         | Gets fake weather data for the specified region. Needs bearer to authorise      | 

#### GET /iam-demo/api/weather

##### Header parameters
|       key        |       value      |
|------------------|------------------|
|   Authorization  |   Bearer a.b.c   |

##### Query parameters
|       key        |       value      |
|------------------|------------------|
|     location     |    some-string   |


License
=======
This code is open sourced licensed under the Apache 2.0 License
