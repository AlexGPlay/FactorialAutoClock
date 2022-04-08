import moment from "moment";

export default async function fileShift(webdriver, clockType) {
  const response = await webdriver.executeAsyncScript(
    function () {
      let headers = {
        "Content-Type": "application/json",
        "X-Factorial-Origin": "web",
      };

      fetch(`https://api.factorialhr.com/attendance/shifts/${arguments[0]}`, {
        method: "POST",
        credentials: "include",
        body: arguments[1],
        headers: headers,
      })
        .then((response) => response.json())
        .then((response) => arguments[arguments.length - 1](response));
    },
    clockType,
    JSON.stringify(getRequestParams())
  );
  return response;
}

function getRequestParams() {
  return {
    force: false,
    now: moment().format(),
  };
}
