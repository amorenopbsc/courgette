const createPage = require('cucumber-protractor/uiTestHelpers/createPage');

const pagePath = 'https://www.google.com/';

module.exports = (world) =>
  createPage('google-home', world, pagePath, {
    'I’m Feeling Lucky': by.css('[value="I\'m Feeling Lucky"]'),
  });
