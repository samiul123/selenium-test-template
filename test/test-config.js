import {createRequire} from 'module'
const require = createRequire(import.meta.url)
import chai from "chai"

function importTest(name, path) {
    describe('name', function () {
        console.log("Importing")
        // it('should blah blah', function () {
        //     console.log("blah")
        // });
        before(function () {
            console.log("Before each test suite")
        })
        import(path)
        it('should blah', function () {
            chai.assert.isTrue(true)
        });
        after(function () {
            console.log("After each test")
        })
    });
}

describe('testConfig', function () {
    console.log("testConfig")
    importTest('example', './test/example/example.test.js');
    importTest('example1', './test/example1/example1.test.js');
});
// let driver, runner, eyes;
// export async function before() {
//     // Create a new chrome web driver
//     driver = await new Builder()
//         .forBrowser('chrome')
//         .build();
//
//     // Create a runner with concurrency of 1
//     const runnerOptions = new RunnerOptions().testConcurrency(1);
//     runner = new VisualGridRunner(runnerOptions);
//
//     // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.
//     eyes = new Eyes(runner);
//
//     // Initialize the eyes configuration.
//     let conf = new Configuration()
//
//     // You can get your api key from the Applitools dashboard
//     conf.setApiKey('bTtF0QYSg6E108VH9GIPblIaOiLl9Dl9xi0CS0d622SbQ110')
//
//     // create a new batch info instance and set it to the configuration
//     conf.setBatch(new BatchInfo("Ultrafast Batch"));
//
//     // Add browsers with different viewports
//     conf.addBrowser(800, 600, BrowserType.CHROME);
//     conf.addBrowser(700, 500, BrowserType.FIREFOX);
//     conf.addBrowser(1600, 1200, BrowserType.IE_11);
//     conf.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
//     conf.addBrowser(800, 600, BrowserType.SAFARI);
//
//     // Add mobile emulation devices in Portrait mode
//     conf.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
//     conf.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
//
//     // set the configuration to eyes
//     eyes.setConfiguration(conf)
// }
//
// export async function after() {
//     // Close the browser.
//     await driver.quit();
//
//     // If the test was aborted before eyes.close was called, ends the test as aborted.
//     await eyes.abortAsync();
//
//     // we pass false to this method to suppress the exception that is thrown if we
//     // find visual differences
//     const allTestResults = await runner.getAllTestResults();
//     console.log(allTestResults);
// }
//
// export {driver, eyes}