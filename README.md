[![Apache-2.0 license](http://img.shields.io/badge/license-Apache-brightgreen.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)

iam-demo-app
============

## How to run
Built using Typescript & NodeJS on node version 12.16.1

Duplicate `.env.sample` as `.env`. Amend the values based on your identity provider and registered application. 

Build the app
```shell script
yarn build
```

Install the dependencies
```shell script
yarn install
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

License
=======
This code is open sourced licensed under the Apache 2.0 License
