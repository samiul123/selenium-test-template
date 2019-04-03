"use strict";

//Import chromedriver
require("chromedriver"); // eslint-disable-line node/no-unpublished-require

//Import Selenium Webdriver
const {
  Builder,
  Capabilities,
  By
} = require("selenium-webdriver");

//Import Applitools SDK and relevant methods
const {
  Eyes,
  VisualGridRunner,
  Target,
  Configuration,
  BrowserType,
  DeviceName,
  ScreenOrientation
} = require("@applitools/eyes-selenium");

/**
 * This initializes eyes and with all the Visual Grid configurations
 */
function initializeEyes() {
  // Initialize the eyes SDK and set your private API key.
  const eyes = new Eyes(new VisualGridRunner());

  //Add your API key
  eyes.setApiKey("zip9Lu5iRetWH4WWsFk9gq90TYuPluhQ0v6Kf104fN4F8110"); //👈🏼 REPLACE ME!

  //Set Selenium configurations
  const config = new Configuration();

  //Set concurrent sesions (upto 100, depending on your license)
  config.setConcurrentSessions(4)

  //Set the app name
  config.setAppName("Demo app");
  config.setTestName("JS Smoke test");

  //Add Chrome browser with two different viewports
  config.addBrowser(800, 600, BrowserType.CHROME);
  config.addBrowser(700, 500, BrowserType.CHROME);

  //Add Firefox browser with two different viewports
  config.addBrowser(1200, 800, BrowserType.FIREFOX);
  config.addBrowser(1600, 1200, BrowserType.FIREFOX);

  //Add iPhone 4 with Portrait mode
  config.addDeviceEmulation(DeviceName.iPhone_4, ScreenOrientation.PORTRAIT);

  //Set any Visual Grid config
  eyes.setConfiguration(config);

  return eyes;
}

async function runTest() {
  // Open a Chrome browser.
  const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

  //initialize Eyes with Visual Grid configuration
  const eyes = initializeEyes();

  try {

    // Navigate the browser to the "hello world!" web-site.
    await driver.get("https://demo.applitools.com");

    // Start the test
    await eyes.open(driver);

    //⭐️To see visual bugs, change the above URL to:
    //  https://demo.applitools.com/index_v2.html and run the test again

    // Visual checkpoint #1.
    await eyes.check("Login Page", Target.window());

    // Click the "Click me!" button.
    await driver.findElement(By.id("log-in")).click();

    // Visual checkpoint #2.
    await eyes.check("Click!", Target.window());

    // End the test.
    // const results = await eyes.close(); // will return only first TestResults, but as we have two browsers, we need more results

    console.log(
      `Please wait, we are now..
      1. Uploading the app's resources (html, css, images)
      2. Rendering them in different browsers, emulators
      3. Analyzing them using our A.I. 

      ...you should see the result within 15 - 60 seconds depending on your internet speed, # combinations and how heavy your app is.
    `
    );
    //This will wait for all the test result to return
    const results = await eyes.getRunner().getAllResults();

    console.log(results); // eslint-disable-line
  } catch (e) {
    console.log(e);
    
    // Close the browser.
    await driver.quit();
  } finally {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called ends the test as aborted.
    await eyes.abortIfNotClosed();
  }
}

//Run
runTest();