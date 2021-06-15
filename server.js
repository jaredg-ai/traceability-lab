const express = require('express')
const path = require('path')
// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
let rollbar = new Rollbar({
  accessToken: '513d2bb205234c3489594eba7d5f0056',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

