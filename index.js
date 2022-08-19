const { constructURL, createBrowserInstance, getAllTests, saveHtmlReports, saveJsonReport } = require('./utils');
const pa11y = require('pa11y');

class Pa11yAccessibility {
  constructor (pa11yConfig) {
    this.config = pa11yConfig;
  };

  async run(options) {
    const browser = await createBrowserInstance(this.config.puppeteer_settings);
    const files = await getAllTests(this.config.src_folders, options)
    
    for (let file of files) {
      let filePath = file;
      if (!file.includes(process.cwd())) {
        filePath = require('path').resolve(process.cwd(), this.config.src_folders, file);
      }
      const testContent = require(filePath);
      const results = await pa11y(constructURL(this.config.launch_url, testContent.url), {...this.config.test_settings, browser, actions: testContent.actions});

      //default reporter set
      let reporters = ['html'];

      if (this.config.reporter.length) {
        reporters = this.config.reporter;
      }
      for (const reporter of reporters) {
        if (reporter === 'html') {
          await saveHtmlReports(file, results, this.config.reports_path)
        } else {
          await saveJsonReport(file, results, this.config.reports_path)
        }
      }
    }

    browser.close();
  }
};

module.exports = Pa11yAccessibility;
