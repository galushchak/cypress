import { defineConfig } from 'cypress'
// @ts-ignore
import {allureCypress} from "allure-cypress/reporter";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    setupNodeEvents(on, config) {
      // noinspection Annotator
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
    },
  },
})