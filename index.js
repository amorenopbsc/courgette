const fs = require('fs');
const path = require('path');

// eslint-disable-next-line
const { pomConfig } = require(path.join(process.cwd(), process.env.confFile || 'conf.js'));
const { spawn } = require('child_process');
const cucumberHtmlReporter = require('cucumber-html-reporter');
// todo make uiTestResult folder
const outputPath = path.join(process.cwd(), pomConfig.outputPath);
const logPath = path.join(outputPath, 'test-result.log');
const logStream = fs.createWriteStream(logPath);
const cmd = 'node_modules/.bin/protractor';
const args = ['./conf.js'];
const spawnedProcess = spawn(cmd, args, { env: process.env });

const cucumberHtmlReporterConfig = Object.assign({
  theme: 'bootstrap',
  jsonDir: `${outputPath}/`,
  output: `${outputPath}/cucumberReport.html`,
  reportSuiteAsScenarios: true,
  launchReport: false,
}, pomConfig.cucumberHtmlReporterConfig);

const printCukeErrors = (el, step) => {
  // eslint-disable-next-line
  if (step.result.error_message) {
    const red = '\x1b[31m%s\x1b[0m';
    const yellow = '\x1b[33m%s\x1b[0m';
    // eslint-disable-next-line
    console.log(red, `------------------ Scenario Error --------------- ${el.name}`);
    // eslint-disable-next-line
    console.log(yellow, `Tags: ${el.tags.map((tag) => tag.name).join(', ')}`);
    // eslint-disable-next-line
    console.log(yellow, `Step: ${step.keyword}${step.name}`);
    // eslint-disable-next-line
    console.log(yellow, `Location: ${step.match.location}`);
    // eslint-disable-next-line
    console.log(yellow, `Error message: ${step.result.error_message}`);
  }
};

const loopThroughReport = () => new Promise((resolve, reject) => {
  try {
    // eslint-disable-next-line
    const features = JSON.parse(fs.readFileSync(`${cucumberHtmlReporterConfig.output}.json`, 'utf8'));

    const elements = features.reduce((arr, scenario) => arr.concat(scenario.elements), []);

    let successCount = 0;
    let failureCount = 0;

    elements.forEach((el) => {
      let scenarioStatus = 'passed';
      el.steps.forEach((step) => {
        const { status } = step.result;
        const { keyword } = step;

        if (!keyword.includes('After') && !keyword.includes('Before')) {
          if (status === 'failed' || scenarioStatus !== 'failed') {
            scenarioStatus = status;
          }
        }

        printCukeErrors(el, step);

        return step.result.status;
      });

      if (scenarioStatus === 'passed') {
        successCount += 1;
      } else if (scenarioStatus === 'failed') {
        failureCount += 1;
      }
    });

    resolve({ successCount, failureCount });
  } catch (e) {
    reject(e);
  }
});

const output = (data) => {
  // eslint-disable-next-line no-console
  console.log(data.toString());

  // eslint-disable-next-line
  logStream.write(data.toString().replace(/\x1b\[\d\dm/g, ''));
};

spawnedProcess.stdout.on('data', output);
spawnedProcess.stderr.on('data', output);

spawnedProcess.on('exit', () => {
  logStream.end();

  cucumberHtmlReporter.generate(cucumberHtmlReporterConfig);

  loopThroughReport();
});