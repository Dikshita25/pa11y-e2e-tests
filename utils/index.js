const fs = require('fs');
const puppeteer = require('puppeteer');
const htmlReporter = require('pa11y-reporter-html');

const constructURL = (launch_url, url) => {
  if (url.includes('http')) {
    return url;
  }

  return `${launch_url}${url}`;
};

//This function will create a report directory if not exists
const createReportPath = (reportsDir = "reports", reportName, reportType = "html") => {
  const reportDirPath = require('path').resolve(process.cwd(), reportsDir);
  if (!fs.existsSync(reportDirPath)) {
    fs.mkdirSync(reportDirPath);
  };

  return require('path').resolve(reportsDir, `${reportName}-report.${reportType}`);
};

const excludePath = (reportPath) => {
  if(reportPath.includes('/')) {
    const reportPathSplit = reportPath.split('/');

    return reportPathSplit[reportPathSplit.length - 1];
  };

  return reportPath;
};

const saveHtmlReports = async (pageName, results, reportsDir) => {
  const html = await htmlReporter.results(results);
  const reportName = excludePath(pageName);
  const reportPath = createReportPath(reportsDir, reportName);
  fs.writeFile(reportPath, html, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`HTML report saved successfully for ${reportName}`)
  })
};

const saveJsonReport = async (pageName, results, reportsDir) => {
  const reportName = excludePath(pageName);
  const reportPath = createReportPath(reportsDir, reportName, 'json');

  fs.writeFile(reportPath, JSON.stringify(results), (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`JSON report saved successfully for ${reportName}`)
  })
};

const createBrowserInstance = async (puppeteerSettings = {}) => {
  return await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
    ...puppeteerSettings
  })
};

const getAllTests = (srcFolder, options) => {
  return new Promise((resolve, reject) => {
    const pathName = require('path').resolve(process.cwd(), srcFolder);
    if (options.test) {
      resolve([require('path').resolve(process.cwd(), options.test)]);
      return;
    }
    
    fs.readdir(pathName, (err, files)=> {
      if (err) {
        console.log(err, 'Error occurred while reading files')
        reject();
      } else {
        resolve(files);
      }
    })
  })
};

module.exports = {
  constructURL,
  saveHtmlReports,
  saveJsonReport,
  createBrowserInstance,
  getAllTests
};
