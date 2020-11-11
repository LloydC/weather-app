const fetch = require("node-fetch");
const { getWeatherMessage } = require("../helpers");
const apiKey = process.env.OWM_API_KEY;

exports.getIndex = (_, res) => {
    res.render('index', { weatherMessage: null, error: null });
}

exports.getLocationDegreesController = async (req, res) => {
    const city = req.body.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();
        const weatherMessage = getWeatherMessage(weatherData);

        res.render("index", { weatherMessage, error: null });
    } catch (err) {
        res.render("index", {
            weatherMessage: null,
            error: err.message ? err.message : err
        });
    }
}

exports.getComputerLocationDegreesController = async (req, res) => {
    const lat = req.body.latitude;
    const long = req.body.longitude;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();
        const weatherMessage = getWeatherMessage(weatherData);

        res.send(weatherMessage);
    } catch (err) {
        res.send(err.message ? err.message : err);
    }
};