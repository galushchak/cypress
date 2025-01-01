import { defineConfig } from 'cypress';
import { allureCypress } from 'allure-cypress/reporter';
import { Status } from 'allure-js-commons';
import os from 'node:os';

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
                links: {
                    issue: {
                        nameTemplate: 'Issue #%s',
                        urlTemplate: 'https://issues.example.com/%s',
                    },
                    tms: {
                        nameTemplate: 'TMS #%s',
                        urlTemplate: 'https://tms.example.com/%s',
                    },
                    jira: {
                        urlTemplate: v => `https://jira.example.com/browse/${v}`,
                    },
                },
                categories: [
                    {
                        name: 'foo',
                        messageRegex: 'bar',
                        traceRegex: 'baz',
                        matchedStatuses: [Status.FAILED, Status.BROKEN],
                    },
                ],
                environmentInfo: {
                    os_platform: os.platform(),
                    os_release: os.release(),
                    os_version: os.version(),
                    node_version: process.version,
                },
            });
            return config;
        },
    },
});
