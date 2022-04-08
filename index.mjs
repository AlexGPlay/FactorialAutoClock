import { configReader } from "./configReader.mjs";
import buildFirefox from "./builder.mjs";
import loginFactorial from "./login.mjs";
import getOpenShift from "./getOpenShift.mjs";
import fileShift from "./fileShift.mjs";
import notification from "./notification.mjs";
import path from "path";

async function execute(headless, basePath, sleepMS) {
  await sleep(sleepMS);
  if (sleepMS > 0) notification("Clock in/out continues", "The process is going to resume");

  const user = configReader(path.resolve(basePath, "data.json"));
  const webdriver = await buildFirefox(headless);
  await loginFactorial(webdriver, user);
  const basicData = await getOpenShift(webdriver);
  const clock_type = Object.keys(basicData).length === 0 ? "clock_in" : "clock_out";
  const response = await fileShift(webdriver, clock_type);
  await webdriver.quit();
  return `${clock_type} => ${JSON.stringify(response)}`;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

notification("Clock in/out", "Process has started");

let executionPath = process.argv[1];
let time = 0;

if (process.argv.includes("-p")) {
  const max = 7;
  const min = 3;
  const msToMinMUltiplier = 60000;

  time = Math.floor(Math.random() * (max - min + 1)) + min;

  notification("Clock in/out random wait", `The process is going to wait ${time} minutes to start`);

  time *= msToMinMUltiplier;
}

const currentDirectory = executionPath.includes(".js")
  ? path.dirname(process.argv[1])
  : executionPath;

const headless = process.argv.includes("-h");
execute(headless, currentDirectory, time).then((res) => notification("Clock in/out done", res));
