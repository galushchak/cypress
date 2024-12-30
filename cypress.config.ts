import { defineConfig } from 'cypress';
// @ts-ignore
import { allureCypress } from 'allure-cypress/reporter';

export default defineConfig({
    e2e: {
        baseUrl: 'https://www.google.com',
        chromeWebSecurity: false,
        specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,ts}',
        retries: { runMode: 1, openMode: 1 },
        defaultCommandTimeout: 4000,
        execTimeout: 60000,
        taskTimeout: 60000,
        pageLoadTimeout: 30000,
        requestTimeout: 5000,
        responseTimeout: 30000,
        downloadsFolder: './result/cypress/downloads',
        screenshotsFolder: './result/cypress/screenshots',
        videosFolder: './result/cypress/videos',
        video: false,
        screenshotOnRunFailure: true,
        trashAssetsBeforeRuns: true,
        viewportHeight: 1900,
        viewportWidth: 1200,
        waitForAnimations: true,
        watchForFileChanges: false,
        scrollBehavior: 'center',
        experimentalRunAllSpecs: true,
        // experimentalWebKitSupport: true,
        defaultBrowser: 'chrome',
        setupNodeEvents(on, config) {
            // noinspection Annotator
            allureCypress(on, config, {
                resultsDir: 'result/allure-results',
            });
            return config;
        },
    },
});
