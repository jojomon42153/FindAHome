# FindAHome

An Android app which receive a notification whenever a new home matching some criteria is published on real estate websites

## server

Shell:
Open 2 terminals

terminal 1:

````shell

    vim ./server/config/criteria.js ==> change home criterias
    vim ./server/config/config.js ==> change search interval
    npm install
    npm run db

````

terminal 2:

````shell

    npm start

````
