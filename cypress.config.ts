import { defineConfig } from 'cypress';
// @ts-ignore
import { allureCypress } from 'allure-cypress/reporter';

export default defineConfig({
	e2e: {
		specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,ts}',
		retries: { runMode: 1, openMode: 1 },
		defaultCommandTimeout: 4000,
		execTimeout: 60000,
		taskTimeout: 60000,
		pageLoadTimeout: 30000,
		requestTimeout: 5000,
		responseTimeout: 30000,
		downloadsFolder: 'misc/downloads',
		screenshotsFolder: 'misc/screenshots',
		videosFolder: 'misc/videos',
		screenshotOnRunFailure: true,
		trashAssetsBeforeRuns: true,
		viewportHeight: 800,
		viewportWidth: 1440,
		setupNodeEvents(on, config) {
			// noinspection Annotator
			allureCypress(on, config, {
				resultsDir: 'allure-results',
			});
			return config;
		},
	},
});
