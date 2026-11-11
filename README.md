# Planit Automation Assessment (Playwright and TypeScript)

This runs a few automated UI test cases on a simple website to allow Planit to assess my automation skills.

# What it does

TC1_contactFormValidation: From the home page, browse to the contact page and click on Submit to make the mandatory field warning messages appear so we can verify that they work as expected. Then it populates the mandatory fields and checks that the warning messages are no longer shown.

TC2_contactFormSubmission: From the home page, browse to the contact page and fill in the mandatory fields and click on Submit to verify that the form is submitted as expected.

TC3_shoppingCartCalculation: From the home page, browse to the shopping page and buy the required toys. Then it moves to the shopping cart page and verifies that the correct number of toys, unit price, total price and cart total price details are as expected.

# Tool choice

I chose Playwright with Typescript for two reasons, the test instructions said 'open-source UI test automation tool of your choice ...with your choice of language and framework' and my familiarity of Playwright and Typescript. It also appears to be a sought after in the jobs I see advertised.

I did limit the setup to use Chromium only, just for speed - more browsers can be added (I did test it with WebKit also)

# Design

PageObjectModel: I've used one class per page (home, contact, shop and shoppingCart) and the locators are all contained in these files, along with methods related to the page. The home page uses a generic navigate method that allows one method to call all required pages.

Fixtures: my 'fixtures/pageObjects' file creates all the page objects for use in the test, so the tests construct them.

Test data: Rather than having hard coded values for the tests, I put the test values in a JSON so that they can be modified without changing the test

Test independence: Each test starts from the home page, so they can be run independently.

Timing: there are no hardcoded waits or sleeps that can slow down tests.

Assertions: these are in the individual test specs - not the page files, to keep the page files reusable and to keep the test files more readable/easier to debug.

Locators: I've used id's and CSS where possible but the shopping cart is using colum positions which would break the test if they changed.

# Running the tests

```bash
npm ci
npx playwright install chromium
npm test						#runs all tests
npm run test:contact-repeat		#runs TC2 five times
npx playwright show-report		#opens the HTML report
```

# Results

Results are written to /playwright-report (HTML) and results/junit.xml (JUnit for Jenkins)

# Continuous Integration

Github actions are configured under .github/workflows/playwright.yml to run all tests and then the 5 x repeat of TC2 on each push to the repo..

Jenkinsfile has been setup to do the same, but I have not verified this against a Jenkins server

# What else could be done?

- Change the shopping cart Page Object to read table column headings dynamically and map each row into an array of objects (keyed by column name) rather than relying on cell positions. This makes cart assertions less likely to break on page changes
- Test on more browsers
- Test on mobile browsers
- More detailed output in the tests to allow for easier debugging
