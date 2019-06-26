'use strict';

// Import chromedriver
require('chromedriver');

// Import Selenium Webdriver
const { Builder, Capabilities } = require('selenium-webdriver');

// Import Applitools SDK and relevant methods
const { Eyes, ClassicRunner, Target, ConsoleLogHandler, Configuration, BatchInfo } = require('@applitools/eyes-selenium'); // should be replaced to '@applitools/eyes-selenium'

function initializeEyes(runner) {
  // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.
  const eyes = new Eyes(runner);
  // Set logger
  eyes.setLogHandler(new ConsoleLogHandler(false));


  // Create Configuration
  const configuration = new Configuration();

  // Set API key
  // configuration.setApiKey('Your API Key');

  // If dedicated or on-prem cloud, uncomment and enter the cloud url
  // Default: https://eyes.applitools.com
  // configuration.setServerUrl("https://testeyes.applitools.com");

  // Set a proxy if required
  // configuration.setProxy('http://localhost:8888');

  // Set the AUT name
  configuration.setAppName('Eyes Examples');

  // Set a test name
  configuration.setTestName('My first Javascript ClassicRunner test!');

  // Set a batch name so all the different browser and mobile combinations are part of the same batch
  configuration.setBatch(new BatchInfo("VIP Browser combo batch"));

  // Set the configuration object to eyes
  eyes.setConfiguration(configuration);
  return eyes;
}

async function runTest(url, runner) {
  //Initialize Eyes with Visual Grid Runner
  const eyes = initializeEyes(runner);

  // Create a new Webdriver
  const webDriver = new Builder()
      .withCapabilities(Capabilities.chrome())
      // .setChromeOptions(new ChromeOptions().headless())
      .build();

  try {
    // Navigate to the URL we want to test
    await webDriver.get(url);

    // Call Open on eyes to initialize a test session
    await eyes.open(webDriver);

    // Check the page
    await eyes.check('Main Page ' + url, Target.window());

    // Close eyes asynchronously
    await eyes.closeAsync();
  } catch (e) {
    console.log('Error', e); // eslint-disable-line
  } finally {
    // Close the browser
    await webDriver.quit();
  }
}

(async () => {
  // Create a runner with concurrency of 10
  const runner = new ClassicRunner();

  try {
    // Define links to process
    const urlsToTest = [
      'https://applitools.com/helloworld',
      'http://applitools-dom-capture-origin-1.surge.sh/testWithIframe.html',
      'http://applitools.github.io/demo/TestPages/FramesTestPage/',
    ];

    // Run test for each link
    for (const url of urlsToTest) {
      await runTest(url, runner);
    }

    // Get all results at once
    const results = await runner.getAllTestResults(false);
    // Print results
    console.log(results); // eslint-disable-line
  } catch (e) {
    // if results failed, it goes here
    console.log('Error', e); // eslint-disable-line
  }
})();
