// https://www.selenium.dev/documentation/overview/

const webdriver = require('selenium-webdriver')

// Edge
const capabilities1 = {
  'bstack:options' : {
      "os": "Windows",
      "osVersion": "11",
      "browserVersion": "latest",
      "buildName" : "browserstack-build-1",
      "sessionName" : "Parallel test 1",
  },
  "browserName": "Edge"
  }

// Chrome
const capabilities2 = {
  'bstack:options' : {
      "os": "Windows",
      "osVersion": "11",
      "browserVersion": "latest",
      "buildName" : "browserstack-build-1",
      "sessionName" : "Parallel test 2",
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
      "sessionName" : "Parallel test 3",
  },
  "browserName": "Safari"
  }

// Functionality test
async function runTestWithCaps (capabilities) {
  let driver = new webdriver.Builder()
    .usingServer('http://arthurborba_QMymrs:Hp3FUxt7dGeEyiK8wtzV@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build()

  try {
    await driver.get("https://daystracker.com/")
  //   await driver.wait(webdriver.until.titleMatches(/StackDemo/i), 10000)
  //   // locating product on webpage and getting name of the product
  //   let productText = await driver
  //     .findElement(webdriver.By.xpath('//*[@id="1"]/p'))
  //     .getText()
  //   // clicking the 'Add to cart' button
  //   await driver.findElement(webdriver.By.xpath('//*[@id="1"]/div[4]')).click()
  //   // waiting until the Cart pane has been displayed on the webpage
  //   driver.findElement(webdriver.By.className("float-cart__content"))
  //   // locating product in cart and getting name of the product in cart
  //   let productCartText = await driver
  //     .findElement(
  //       webdriver.By.xpath(
  //         '//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]'
  //       )
  //     )
  //     .getText()
  //   // checking whether product has been added to cart by comparing product name
  //   if(productCartText !== productText) 
  //     throw new Error("")
  //   await driver.executeScript(
  //     'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Product has been successfully added to the cart!"}}'
  //   )
  // } catch (e) {
  //   await driver.executeScript(
  //     'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Some elements failed to load!"}}'
  //   )
  // }
  await driver.quit()
}

// Run the tests in each browser
runTestWithCaps(capabilities1)
runTestWithCaps(capabilities2)
runTestWithCaps(capabilities3)