import seleniumWebdriver from 'selenium-webdriver'
const { Builder } = seleniumWebdriver;
import Firefox from 'selenium-webdriver/firefox.js';

export default async function buildFirefox(headless = false){
  const screen = {
    width: 640,
    height: 480
  };

  let options = new Firefox.Options().windowSize(screen);
  if(headless) options.headless();

  return await new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(options)
  .build();
}