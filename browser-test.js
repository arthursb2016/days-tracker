// WebDriver API: https://www.selenium.dev/documentation/overview/
// Results Dashboard (since its remote tested): BrowserStack
// For real world scenarios, remember: https://www.selenium.dev/documentation/test_practices/encouraged/

const { Builder, By, until } = require('selenium-webdriver')
const assert = require('assert')

// Edge
const capabilities1 = {
  'bstack:options' : {
      "os": "Windows",
      "osVersion": "11",
      "browserVersion": "latest",
      "buildName" : "browserstack-build-1",
      "sessionName" : "Edge Latest (Windows)",
  },
  "browserName": "Edge"
  }

// Chrome
const capabilities2 = {
  'bstack:options' : {
    "os": "OS X",
    "osVersion": "Monterey",
    "browserVersion": "latest-1",
    "buildName" : "browserstack-build-1",
    "sessionName" : "Chrome Latest-1 (OS X)",
  },
  "browserName": "Chrome"
  }

// Safari
const capabilities3 = {
  'bstack:options' : {
      "os": "OS X",
      "osVersion": "Ventura",
      "browserVersion": "16.0",
      "buildName" : "browserstack-build-1",
      "sessionName" : "Safari Latest (OS X)",
  },
  "browserName": "Safari"
  }

// Firefox
const capabilities4 = {
  'bstack:options' : {
    "os": "Windows",
    "osVersion": "11",
    "browserVersion": "latest-1",
    "buildName" : "browserstack-build-1",
    "sessionName" : "Firefox Latest-1 (Windows)",
  },
  "browserName": "Firefox"
}

// Functionality test
async function runTestWithCaps (capabilities) {
  let driver = await new Builder()
  .usingServer('http://arthurborba_QMymrs:Hp3FUxt7dGeEyiK8wtzV@hub-cloud.browserstack.com/wd/hub')
  .withCapabilities({
    ...capabilities,
    ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
  })
  .build()

  try {
    await driver.get("https://daystracker.com/")

    // Checks page title
    let title = await driver.getTitle()
    assert.equal('Days Tracker', title)

    // Waits for both inputs to load
    const startDate = await driver.wait(until.elementLocated(By.id('startDatePicker')), 3000)
    const endDate = await driver.wait(until.elementLocated(By.id('endDatePicker')), 3000)

    // Clicks the first day of the start date calendar
    await startDate.click()
    const startFirstDay = await driver.wait(until.elementLocated(By.css('.dp__instance_calendar .dp__calendar .dp__calendar_item')), 3000)
    await startFirstDay.click()

    // Checks if track button appears
    const button = await driver.findElement(By.className('track-button'))

    // Clicks the second day of the end date calendar
    await endDate.click()
    const endSecondDay = await driver.wait(until.elementLocated(By.css('.dp__instance_calendar .dp__calendar .dp__calendar_item:nth-child(2)')), 3000)
    await endSecondDay.click()

    // Asserts the date difference math
    const dateDiff = await driver.findElement(By.id('dateDiff'))
    const dateDiffValue = await dateDiff.getText()
    assert.equal(Number(dateDiffValue), 1)

    // Sends success data to Browser Stack
    const script = 'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed", "reason": "Days were successfully tracked!"}}'
    await driver.executeScript(script)

  } catch (e) {
    // Sends error data to Browser Stack
    const script = 'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed", "reason": "Failed test"}}'
    await driver.executeScript(script)
  }

  await driver.quit()
}

// Run the tests in each browser
runTestWithCaps(capabilities1)
runTestWithCaps(capabilities2)
runTestWithCaps(capabilities3)
runTestWithCaps(capabilities4)