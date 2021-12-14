import express, { response } from 'express'
import chalk from 'chalk'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import moment from 'moment'
import timezone from 'moment-timezone'
dotenv.config()

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', async (req, res) => {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=Istanbul&units=metric&appid=${process.env.API_KEY}`;

    try {
        await fetch(url)
        .then(res => res.json())
        .then(data => {
            const city = data.name;
            const description = data.weather[0].description;
            const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            const temp = data.main.temp;
            const country = data.sys.country;
            const humidity = data.main.humidity;
            const windDeg = data.wind.deg;
            const date = new Date(data.dt * 1000 - (data.timezone * 1000));
            const lastUpd = new Intl.DateTimeFormat('en-Us', {dateStyle: 'medium', timeStyle: 'short'}).format(date);
            const windDirection = degreesToCardinalDirection(windDeg);
            const abrKPH = abrNumber(data.wind.speed * 3.6);
            const sunrise = moment(new Date(data.sys.sunrise * 1000)).format("LT"); 
            const sunset = moment(new Date(data.sys.sunset * 1000)).format("LT"); 
            const currTime = timezone().tz("Europe/Istanbul").format("MMM, DD hh:mm a");
            
            

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
                lastUpd: lastUpd
            });
        });
    } catch (err) {
        res.render('index', {
            city: err
        })
    }
})

app.listen(process.env.PORT)

console.log(chalk.blue('[express] Server started at ' + process.env.PORT))
