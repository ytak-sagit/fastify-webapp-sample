const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
require('dotenv').config(); // .envの読み込み

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/**/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: process.env.BASE_URL,
      show: true,
      browser: 'chromium'
    },
    ResembleHelper: {
      require: 'codeceptjs-resemblehelper',
      screenshotFolder: './output/',
      baseFolder: './baseImages/',
      diffFolder: './output/diff',
      prepareBaseImage: process.env.PREPARE_BASE_IMAGE === 'true',
    },
    // ApplitoolsHelper: {
    //   require: 'codeceptjs-applitoolshelper',
    //   applitoolskey: process.env.APPLITOOLS_API_KEY,
    // },
  },
  include: {
    I: './steps_file.js',
    utils: './utils',
  },
  translation: 'en-US',
  vocabularies: ['./vocabularies.json'],
  name: 'e2e',
  plugins: {
    allure: {
      enabled: true,
      require: 'allure-codeceptjs'
    },
    stepByStepReport: {
      enabled: true,
      screenShotsForAllureReport: true,
      deleteSuccessful: false
    }
  }
}
