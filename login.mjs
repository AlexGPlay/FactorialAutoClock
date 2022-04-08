import seleniumWebdriver from 'selenium-webdriver'
const { By, Key, until } = seleniumWebdriver;

export default async function loginFactorial(webdriver, user){
  await webdriver.get('https://api.factorialhr.com/users/sign_in');
  await webdriver.findElement(By.id('user_email')).sendKeys(user.email);
  await webdriver.sleep(300);
  await webdriver.findElement(By.id('user_password')).sendKeys(user.password + Key.ENTER);
  await webdriver.wait(until.elementsLocated(By.id('factorialRoot')), 100000);
  await webdriver.sleep(1000);
}