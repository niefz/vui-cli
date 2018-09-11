module.exports = {
  'Basic e2e Test'(browser) {
    browser
      .url('https://www.baidu.com/')
      .maximizeWindow()
      .waitForElementVisible('body', 5000)
      .setValue('#kw', 'Nightwatch')
      .click('#su')
      .waitForElementVisible('#container', 5000)
      .saveScreenshot('test/e2e/report/answers.png')
      .end();
  },
};