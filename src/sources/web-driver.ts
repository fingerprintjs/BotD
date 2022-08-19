export function getWebDriver(): boolean {
  if (navigator.webdriver == undefined) {
    throw new Error('navigator.webdriver is undefined')
  }
  return navigator.webdriver
}
