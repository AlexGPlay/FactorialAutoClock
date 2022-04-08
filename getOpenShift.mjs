export default async function getOpenShift(webdriver) {
  const response = await webdriver.executeAsyncScript(function () {
    fetch(`https://api.factorialhr.com/attendance/shifts/open_shift`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => arguments[arguments.length - 1](response));
  });
  return response;
}
