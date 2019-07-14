# strategyweb

prototype web app for strategy


To run it

```
npm start
```

This will run react on port 3000 and the api server on port 3001

Design note:

In theory, one could run the entire app in the client, with no backend server.  It *could* make calls to MySql and TBA.  But at events there is no internet, so there's no calling TBA. 

As for SQL, I could not get the mysql library to work from the browser.

It's probably cleaner to keep all the SQL modularized on the back anyway.

Note that we definitely need SQL, or at least some type of local persisten store. At events there is no internet, so there's no calling TBA. We need to have fetched all the data we need from TBA before the event, so we need a place to store it, e.g. sql. We could of course use other stores, such as Mongo.  
