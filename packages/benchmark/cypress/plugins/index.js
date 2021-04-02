const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");
const fs = require('fs').promises

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse(async (lighthouseReport) => {
      console.log(lighthouseReport); // raw lighthouse reports
      await fs.writeFile('./reports/lighthouse.json', JSON.stringify(lighthouseReport, null, 4))
    }),
    pa11y: pa11y(async (pa11yReport) => {
      console.log(pa11yReport); // raw pa11y reports
      await fs.writeFile('./reports/pa11y.json', JSON.stringify(pa11yReport, null, 4))

    }),
  });
};