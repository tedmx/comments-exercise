# Comments Exercise

A bit of AngularJS 1.5.x applied to a comment system snippet.

To execute the app, use:

    npm start


To run the tests, use:

    npm test

# Structure of comments' data

App uses two ways of presenting full comments' data: flat and as a tree.

Tree representation is needed for natural and elegant work with Angular templating logic, for populating views with data.

Flat representation is used as emulation of a back-end data store.

Backend of the app uses flat data for all operations, and returns the flat data to client code. Client-code converts flat data to a tree-structured data.

# Backend component

Backend component of the app is represented mainly by two services: `comments-data-manager.service.js` and `comments-storage.service.js`. 

`comments-storage.service.js` is responsible for talking with the client code, for interacting with concrete persistent store (`localStorage` in this app's case). It doesn't know anything about inner implementation of comments' data object or correct way to modify comments' data.

`comments-data-manager.service.js` is responsible for low-level manipulation of comments' data. It doesn't know about concrete storage mechanism, doesn't interact with client code directly. Instead, `comments-data-manager.service.js` is called by `comments-storage.service.js`.

Thus, `comments-storage.service.js` is a bridge between client code and low-level `comments-data-manager.service.js` operator. From another point of view, `comments-storage.service.js` can be viewed as abstraction of `comments-data-manager.service.js`.

# Tree-structured data on client side

Comments' data, getting to the client's side, is converted from a flat representation into tree structure. That manipulation is done by single helper function `commentDataTreeFromArray(array)`, declared as part of `commentDataUtils` service contained in `app.module.js`. `commentDataUtils` is DI'ed into top-level code of client-side and is called on demand.