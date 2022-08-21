export default function getSeleniumDocumentProps(): boolean[] {
  return [
    document.__selenium_unwrapped != null,
    document.__webdriver_evaluate != null,
    document.__driver_evaluate != null,
  ]
}
