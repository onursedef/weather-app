
# Weather App

A weather app created by using ExpressJs.


## 

![App Screenshot](https://raw.githubusercontent.com/onursedef/weather-app/master/public/img/weather-expres.herokuapp.com_.png?token=AJWU7F2XN5CTAJ3WRI6SVOTBXCJYY)

## 
## Installation

First clone this project

```bash
    git clone https://github.com/onursedef/weather-app.git
```
Then go to project directory

```bash
    cd weather-app
```
Now you have to install dependicies for this we will use

```bash
    npm install
```
This'll download all dependicies. 

I'm using env file so i suggest you to use this if you dont want your api keys seen by others.
```bash
    # use this command to create a .env file if you are on windows
    New-Item .env

    # if you are on linux or mac
    touch .env
```
Write this in your .env file
```bash
    PORT=<port you wanna use>
    API_KEY=<key you got from Openweather Apı>
```

```bash
    # if you wanna use npm
    npm run dev

    # or using yarn
    yarn dev
```
Now you can start using this app.

### Changing City

If you wanna change the city it is easy. Go to server.js then find 
```javascript
    let url = `http://api.openweathermap.org/data/2.5/weather?q=Istanbul&...`;
```
variable. Now you can change the city by deleting 'Istanbul' and write the city name.
## # Reference

I used various developers functions for this I'm refering them;

```js
    function degreesToCardinalDirecton(d) {
        ...
    }
```
written by [Chuck Reynolds](https://gist.github.com/chuckreynolds)

```js
    function abrNumber(value) {,
    ...
    }
```
written by [chucktator and Tushar Sharma](https://stackoverflow.com/a/10601315) on Stackoverflow