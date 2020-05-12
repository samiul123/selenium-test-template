'use strict';

const { Builder, By } = require('selenium-webdriver');
const { Eyes, VisualGridRunner, Target, RectangleSize, Configuration, BatchInfo, BrowserType, DeviceName, ScreenOrientation} = require('@applitools/eyes-selenium');

describe('DemoApp - Ultrafast Grid', function () {
  let runner, eyes, driver;

  beforeEach(async () => {
    // Initialize the Runner for your test.
    runner = new VisualGridRunner(1);

    // Initialize the eyes SDK (IMPORTANT: make sure your API key is set in the APPLITOOLS_API_KEY env variable).
    eyes = new Eyes(runner);

    // Initialize the eyes configuration.
    let conf = new Configuration()

    // You can get your api key from the Applitools dashboard
    conf.setApiKey('APPLITOOLS_API_KEY')

    // create a new batch info instance and set it to the configuration
    conf.setBatch(new BatchInfo("Ultrafast Batch"));

    // Add browsers with different viewports
    conf.addBrowser(800, 600, BrowserType.CHROME);
    conf.addBrowser(700, 500, BrowserType.FIREFOX);
    conf.addBrowser(1600, 1200, BrowserType.IE_11);
    conf.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
    conf.addBrowser(800, 600, BrowserType.SAFARI);

    // Add mobile emulation devices in Portrait mode
    conf.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    conf.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);

    // set the configuration to eyes
    eyes.setConfiguration(conf)

    // Use Chrome browser
    driver = await new Builder()
        .forBrowser('chrome')
        // .setChromeOptions(new ChromeOptions().headless())
        .build();
  });

  it('Smoke Test', async () => {
    // Start the test by setting AUT's name, test name and viewport size (width X height)
    await eyes.open(driver, 'Demo App', 'Ultrafast grid demo', new RectangleSize(800, 600));

    // Navigate the browser to the "ACME" demo app.
    await driver.get("https://demo.applitools.com");

    // To see visual bugs after the first run, use the commented line below instead.
    // await driver.get("https://demo.applitools.com/index_v2.html");

    // Visual checkpoint #1 - Check the login page.
    await eyes.check("Login Window", Target.window().fully());

    // This will create a test with two test steps.
    await driver.findElement(By.id("log-in")).click();

    // Visual checkpoint #2 - Check the app page.
    await eyes.check("App Window", Target.window().fully());

    // End the test.
    await eyes.closeAsync();
  });

  afterEach(async () => {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortIfNotClosed();

    // Wait and collect all test results
    const allTestResults = await runner.getAllTestResults();
    console.log(allTestResults);
  });
});

