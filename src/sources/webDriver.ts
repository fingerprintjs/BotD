export default function getWebDriver(): boolean {
  if (navigator.webdriver == undefined) throw new Error('undefined')
  return navigator.webdriver
}
