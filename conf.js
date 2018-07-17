require('babel-core/register');

const specsPath = 'tests';
const specsPathAbs = `${process.cwd()}/tests`;
const outputPath = 'uiTestResult';
const cukeTractorPath = 'uiTestHelpers'; // todo, change to node_modules/etc...

exports.pomConfig = {
  outputPath,
  pagesPath: `${specsPathAbs}/pages`,
  componentsPath: `${specsPathAbs}/pages/components`,
  baseUrl: 'http://localhost:3000',
};

exports.cucumberHtmlReporterConfig = {};

const protractorConfig = {
  directConnect: true,
  ignoreUncaughtExceptions: true,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [
    `${specsPath}/features/**/*.feature`,
  ],
  capabilities: {
    shardTestFiles: !process.env.cukeTags && !process.env.debug,
    maxInstances: 4,
    browserName: 'chrome',
    chromeOptions: {
      args: ['--window-size=1100,800'].concat(process.env.disableHeadless ? [] : ['--headless', '--disable-gpu']),
    },
  },
  cucumberOpts: {
    require: [
      // `${specsPath}/helpers/globals.js`,
      `${cukeTractorPath}/globals.js`,
      `${cukeTractorPath}/hooks/attachScenarioNameBefore.js`,
      `${cukeTractorPath}/hooks/attachScreenshotAfter.js`,
      `${cukeTractorPath}/hooks/pageObjectModelBefore.js`,
      `${cukeTractorPath}/hooks/setDefaultTimeout.js`,
      `${cukeTractorPath}/stepDefinitions/*.js`,
      `${specsPath}/stepDefinitions/*.js`,
      // `${specsPath}/helpers/hooks.js`,
    ],
    tags: ['~ignore'].concat(process.env.cukeTags || []),
    format: [
      'cucumberFormatter.js',
      `json:./${outputPath}/report.json`,
    ],
    profile: false,
    'no-source': true,
  },
  onPrepare: () => { browser.ignoreSynchronization = true; },
};

exports.config = protractorConfig;