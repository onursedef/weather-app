import express from 'express' // for sending api's data to front-end
import chalk from 'chalk' // for fancy console prompts
import dotenv from 'dotenv' // if you dont want other to see your api key set a environment variables
import fetch from 'node-fetch' //fetching api
import moment from 'moment' //turning times to string format and adjusting them
import timezone from 'moment-timezone' // same purpose 
dotenv.config() 

const app = express()

app.set('view engine', 'ejs') // setting view engine is important 

app.use(express.static('public')) // this allows you to use files in ./public so you can style your site etc.

app.get('/', async (req, res) => { // sending api constantly to front-end
    let url = `http://api.openweathermap.org/data/2.5/weather?q=Istanbul&units=metric&appid=${process.env.API_KEY}`;

    try {
        await fetch(url)
        .then(res => res.json())
        .then(data => {
            const city = data.name; // Istanbul
            const description = data.weather[0].description; // Broken cloud etc.
            const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // weather icon
            const temp = data.main.temp; // 29.77777...
            const country = data.sys.country; // Turkey
            const humidity = data.main.humidity; // 87
            const windDeg = data.wind.deg; // 384
            const windDirection = degreesToCardinalDirection(windDeg);  // North-Nortwest
            const abrKPH = abrNumber(data.wind.speed * 3.6); // 33.3 
            const sunrise = moment(new Date(data.sys.sunrise * 1000)).tz("Europe/Istanbul").format("LT"); // 8:21 AM
            const sunset = moment(new Date(data.sys.sunset * 1000)).tz("Europe/Istanbul").format("LT");  // 5:36 PM
            const currTime = timezone().tz("Europe/Istanbul").format("MMM, DD hh:mm A"); // Current time in Istanbul
            const yearNow = moment(Date.now()).format("YYYY"); // 2021 for copyright
            

    // Setting direction according to the wind degree
    function degreesToCardinalDirection(d) { 
        d = d % 360;

        if (11.25 <= d && d < 33.75) {
            return "North-Northeast";
        } else if (33.75 <= d && d < 56.25) {
            return "Northeast";
        } else if (56.25 <= d && d < 78.75) {
            return "East-Northeast";
        } else if (78.75 <= d && d < 101.25) {
            return "East";
        } else if (101.25 <= d && d < 123.75) {
            return "East-Southeast";
        } else if (123.75 <= d && d < 146.25) {
            return "Southeast";
        } else if (146.25 <= d && d < 168.75) {
            return "South-Southeast";
        } else if (168.75 <= d && d < 191.25) {
            return "South";
        } else if (191.25 <= d && d < 213.75) {
            return "South-SouthWest";
        } else if (213.75 <= d && d < 236.25) {
            return "Southwest";
        } else if (236.25 <= d && d < 258.75) {
            return "West-Southwest";
        } else if (258.75 <= d && d < 281.25) {
            return "West";
        } else if (281.25 <= d && d < 303.75) {
            return "West-Northwest";
        } else if (303.75 <= d && d < 326.25) {
            return "Northwest";
        } else if (326.25 <= d && d < 348.75) {
            return "North-Northwest";
        } else {
            return "North";
        }  
    }

    // abbreviation of numbers like 3.33333 => 3.3
    function abrNumber(value){
        let newValue = value;
        const suffixes = ["", "K", "M", "B", "T"];
        let suffixNum = 0;
        while (newValue >= 1000) {
            newValue /= 1000;
            suffixNum++;
        }

        newValue = newValue.toPrecision(3);

        newValue += suffixes[suffixNum];
        return newValue;
    }
            // posting all variables to index.ejs
            res.render('index', {
                city: city,
                desc: description,
                icon: icon,
                temp: temp,
                windSpeedKPH: abrKPH,
                country: country,
                humidity: humidity,
                windDir: windDirection,
                windDeg: windDeg,
                sunrise: sunrise,
                sunset: sunset,
                currTime: currTime,
                copyright: '© '+ yearNow +', Onur Sedef. Tüm hakları saklıdır. '
            });
        });
    } catch (err) {
        res.render('index', {
            city: err
        })
    }
})

// active port in localhost
app.listen(process.env.PORT)

// fancy console output
console.log(chalk.blue('[express] Server started at ' + process.env.PORT))
