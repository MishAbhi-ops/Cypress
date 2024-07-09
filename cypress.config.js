const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video:true,
  e2e: {
    baseUrl:'https://demoblaze.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
