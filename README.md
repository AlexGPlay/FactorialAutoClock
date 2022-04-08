## Factorial Auto Clock

A selenium bot for clocking in or out in factorialhr.com.

### How does it work

The selenium will go to the login page of Factorial and login with the credentials of data.json. After that it will stop interacting with the interface and send requests to the Factorial API to clock in and out. There is no need to tell the system if it needs to clock in or out because it will ask Factorial if there is one work shift currently clocked in, if there is it will clock out and if there isn't one it will clock in.

### Setup

The first requirement is to have node installed in your system, so it isn't installed go to their [webpage](https://nodejs.org/es/download/) and install it.

Right now the system only works with Firefox so to use it you need to install a version of it and add geckodriver to your system path.

1. Download Firefox from their [official site](https://www.mozilla.org/).

2. Download the latest geckodriver version from its [github](https://github.com/mozilla/geckodriver/releases).

3. Add the geckodriver to the system PATH.

Now in order to the Selenium to use your account you have to introduce your credentials in the data.json file. Like for example:

```json
{
  "user": {
    "email": "foo@bar.com",
    "password": "mysupersecurepassword"
  }
}
```

Once all of that is done you have to install the dependencies with `npm install`, now that everything is prepared you just need to launch it with `node .`.

### CLI options

The program is pretty simple, but it has two arguments that can be passed to modify some things.

-p will run the program with a random stop from 3 to 7 minutes before clocking in or out. It is done that way because so you don't file your shift at the same time every day.

-h will run the program in headless mode so it doesn't open a browser window when it is going to file a shift.

### Example

I run the program for all my shifts in an ubuntu system so I have it on a crontab. My shifts are from 09:00-14:30 and from 15:30 to 18:30 from Monday to Thursday and from 08:30-14:00 on Fridays so my crontab goes like:

```
0 9 * * 1,2,3,4 <path_to_node>/node <path_to_program>/index.mjs -h
30 14 * * 1,2,3,4  <path_to_node>/node <path_to_program>/index.mjs -h -p
15 30 * * 1,2,3,4 <path_to_node>/node <path_to_program>/index.mjs -h -p
18 30 * * 1,2,3,4 <path_to_node>/node <path_to_program>/index.mjs -h -p

30 8 * * 5 <path_to_node>/node <path_to_program>/index.mjs -h
30 14 * * 5  <path_to_node>/node <path_to_program>/index.mjs -h -p
```
