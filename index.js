'use strict';

//Import chromedriver
require('chromedriver'); // eslint-disable-line node/no-unpublished-require

//Import Selenium Webdriver
const {
  Builder,
  Capabilities,
  By
} = require('selenium-webdriver');

//Import Applitools SDK and relevant methods
const {
  Eyes,
  VisualGridRunner,
  Target,
  SeleniumConfiguration,
  BrowserType,
  DeviceName,
  ScreenOrientation
} = require('@applitools/eyes-selenium');


async function runTest() {
  // Open a Chrome browser.
  const driver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

  // Initialize the eyes SDK and set your private API key.
  const eyes = new Eyes(new VisualGridRunner());

  //Add your API key
  eyes.setApiKey('0LBQY6svVsa6nFq94Z100KTLXjFd2M9vE98jNTo6x9hppw110');

  try {

    //Set Selenium configurations
    const config = new SeleniumConfiguration();

    //Set concurrent sesions (upto 100, depending on your license)
    config.concurrentSessions = 3;

    //Set the app name
    config.appName = 'Demo app';
    config.testName = 'JS Smoke test';

    //Add Chrome browser with 1200x800 viewport
    config.addBrowser(1200, 800, BrowserType.CHROME);

    //Add Firefox browser with 1200x800 viewport
    config.addBrowser(1200, 800, BrowserType.FIREFOX);

    //Add iPhone 4 with Portrait mode
    config.addDevice(DeviceName.iPhone_4, ScreenOrientation.PORTRAIT);

    eyes.setConfiguration(config);

    // Start the test and set the browser's viewport size to 800x600.
    // await eyes.open(driver, 'Eyes Examples', 'My first Javascript test!', { width: 800, height: 600 }); // also will work without configuration with a single browser
    await eyes.open(driver);

    // Navigate the browser to the "hello world!" web-site.
    await driver.get('https://demo.applitools.com');

    //⭐️To see visual bugs, change the above URL to:
    //  https://demo.applitools.com/index_v2.html and run the test again

    // Visual checkpoint #1.
    await eyes.check('Login Page', Target.window());

    // Click the "Click me!" button.
    await driver.findElement(By.id('log-in')).click();

    // Visual checkpoint #2.
    await eyes.check('Click!', Target.window());

    // End the test.
    // const results = await eyes.close(); // will return only first TestResults, but as we have two browsers, we need more results

    console.log(
      `Please wait, we are now..
      1. Uploading the app's resources (html, css, images)
      2. Rendering them in different browsers, emulators
      3. Analyzing them using our A.I. 

      ...you should see the result within 15 - 60 seconds depending on your internet speed, # combinations and how heavy your app is.
    `)
    //This will wait for all the test result to return
    const results = await eyes.getRunner().getAllResults();

    console.log(results); // eslint-disable-line
  } catch (e) {
    console.log(e);
  } finally {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called ends the test as aborted.
    await eyes.abortIfNotClosed();
  }
}

//Run
runTest();