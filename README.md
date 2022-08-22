### Run accessibility tests using Pa11y and Puppeteer
This package allows you to run accessibility tests using [Pa11y](https://pa11y.org/) which is an automated testing pal.

#### Installation
1. Install the package using command:
```
npm install -g accessibility-pa11y-aider
```
#### Configuration
1. A configuration file should be created in-order to get started with accessibility testing, which will contain pre-defined test settings for running the tests againist browsers etc.

Here's an extract of `pa11y.config.js`:
`github.com/pa11y-examples/.../pa11y.config.js`
```
module.exports = {
  launch_url: "https://www.saucedemo.com",
  src_folders: "tests",
  reports_path: "reports",
  reporter: ["json", "html"],
  test_settings: {
    runners: [
      'axe',
      'htmlcs'
    ],
    standard: 'WCAG2A',
    timeout: 120000,
    includeNotices: true,
    includeWarnings: true
  },
  puppeteer_settings: {
    headless: false,
    executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
  }
};
```
The above `config` contains couple of configurations: 
* launch_url : contains the default url to be launched by the browser
* src_folders: Need to define the folder name which contains tests to be run
* reports_path: Location to be specified for test results to be saved
* reporter: Specify the kind of reports needs to be generated. Currently supports 2 formats i.e `json` and `html`
* test_settings: Below are the default settings that will be passed during test execution:

| Name            | Types   | Default | description                               |
| :----------     |:------: | :------:| ----------------------------------------- |
| runners         | array   | none    | An array of runner names which correspond to    existing and installed pa11y runners, If runner is not found then pa11y will throw error |
| standard        | string  | WCAG2AA | The accessibility standard to use when testing pages. This should be one of WCAG2A, WCAG2AA, or WCAG2AAA. Note: only used by htmlcs runner |
| timeout         | integer | none    | The time in milliseconds that a test should be allowed to run before calling back with a timeout error.Please note that this is the timeout for the entire test run (including time to initialise Chrome, load the page, and run the tests) |
| includeNotices  | boolean | false   | Whether to include results with a type of notice in the Pa11y report.Issues with a type of notice are not directly actionable and so they are excluded by default. You can include them by using this option |
| includeWarnings | boolean | false   | Whether to include results with a type of warning in the Pa11y report. Issues with a type of warning are not directly actionable and so they are excluded by default.You can include them by using this option |

* puppeteer_settings: Puppeteer is used internally to launch the browser. Puppeteer by default uses Chromium in headless mode, however the user can defined the necessary configurations mentioned in the official documentation [link](https://github.com/puppeteer/puppeteer#default-runtime-settings)

2. Create a `firstTest.js` under `tests` folder :
```
module.exports = {
  url: `${process.env.BASE_URL}/`,
  actions: [
    'set field #username to standard_user',
    'set field #password to secret_sauce',
    'click element input[name=login-button]',
    'wait for element div[class="app_logo"] to be visible'
  ]
}
```
3. Run the command and observe the coverage of a11y (accessibility) issues
* To run all the tests under `tests` folder, use command:
```
npm run runAccessibility
```
* To run only a specific test from the `tests` folder, use command:
```
runAccessibility --test tests/firstTest.js
```

#### Example
Sample repository for [references](https://github.com/Dikshita25/pa11y-example-tests)
