const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

async function fetchFoundersData(companyName) {
    let options = new chrome.Options();
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-gpu');
    options.addArguments('--disable-extensions');
    options.addArguments('--window-size=1920,1080');

    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get('https://crunchbase.com/');
        // Add more automation logic here as necessary
    } catch (error) {
        console.error('Error during automation:', error);
    } finally {
        await driver.quit(); // Make sure to quit the driver to close the browser
    }
}

module.exports = {fetchFoundersData}
