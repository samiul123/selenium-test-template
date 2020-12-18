'use strict';

// import {before, after, driver, eyes} from './test-config.js'
// import {createRequire} from 'module'
// const require = createRequire(import.meta.url)
// const { Eyes, VisualGridRunner, RunnerOptions, Target, RectangleSize, Configuration, BatchInfo, BrowserType, DeviceName, ScreenOrientation} = require('@applitools/eyes-selenium');
// const { Builder, By } = require('selenium-webdriver');

// describe('DemoApp - Ultrafast Grid', function () {
//   before(()=>before());
//
//   it('ultraFastTest', async () => {
//     // Call Open on eyes to initialize a test session
//     await eyes.open(driver, 'Demo App', 'Ultrafast grid demo', new RectangleSize(800, 600));
//
//     // Navigate the browser to the "ACME" demo app.
//     // ⭐️ Note to see visual bugs, run the test using the above URL for the 1st run.
//     // but then change the above URL to https://demo.applitools.com/index_v2.html
//     // (for the 2nd run)
//     await driver.get("https://demo.applitools.com");
//
//     // check the login page with fluent api, see more info here
//     // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html
//     await eyes.check("Login Window", Target.window().fully());
//
//     // This will create a test with two test steps.
//     await driver.findElement(By.id("log-in")).click();
//
//     // Check the app page
//     await eyes.check("App Window", Target.window().fully());
//
//     // Call Close on eyes to let the server know it should display the results
//     await eyes.closeAsync();
//   });
//
//   after(()=>after());
// });

import {options, chai} from '../common.js';

// describe('visualgrid', function () {
    // beforeEach(function () {
    //     console.log("Before each test visualgrid")
    // })

// });
it('should blah example', function () {
    console.log("example: ", options.foo)
    chai.assert.isTrue(true)
})

