const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getDaysBetweenDates, fetchData } = require("./utils");

const app = express();

// Configuring express to use body-parser as middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

//api url
// https://secure.geonames.org/searchJSON?q=danang&maxRows=10&username=tampc1
const geonamesBaseURL = "https://secure.geonames.org";
const geonamesApiKey = process.env.GEONAMES_API_KEY;
// https://api.weatherbit.io/v2.0/forecast/daily?lat=16.06778&lon=108.22083&key=723118fb280a46d5bc650aaaa26b3479
const weatherbitBaseURL = " https://api.weatherbit.io/v2.0";
const weatherbitApiKey = process.env.WEATHERBIT_API_KEY;
// https://pixabay.com/api/?key=22140600-67da7abf40f7e47eef517beac&q=Da%20Nang&per_page=3&category=nature&safesearch=true&orientation=horizontal
const pixabayBaseURL = "https://pixabay.com/api";
const pixabayApiKey = process.env.PIXABAY_API_KEY;

app.post("/travel-planner", async (req, res) => {
  const { location, departing } = req.body;

  if (!location) return res.status(400).json({ message: "Invalid location" });
  if (!departing) return res.status(400).json({ message: "Invalid departing" });

  try {
    const { geonames, totalResultsCount } = await fetchData(
      `${geonamesBaseURL}/searchJSON?q=${location}&maxRows=5&username=${geonamesApiKey}`
    );

    if (totalResultsCount === 0)
      return res.status(400).json({ message: "Invalid location" });

    const { lng, lat, name, countryName } = geonames[0];

    const { hits } = await fetchData(
      `${pixabayBaseURL}/?key=${pixabayApiKey}&q=${encodeURIComponent(
        name
      )}&per_page=3&category=nature&safesearch=true&orientation=horizontal`
    );
    const { largeImageURL } = hits[0];

    const { data } = await fetchData(
      `${weatherbitBaseURL}/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbitApiKey}`
    );

    const daysAway = getDaysBetweenDates(new Date().toDateString(), departing);

    if (daysAway < 0 || daysAway > 6) {
      return res.status(400).json({ message: "Invalid departing" });
    }

    const {
      max_temp,
      min_temp,
      valid_date,
      weather: { description },
      pop,
    } = data[daysAway];

    return res.status(200).json({
      status: 200,
      data: {
        id: lng + lat + valid_date,
        name,
        countryName,
        largeImageURL,
        max_temp,
        min_temp,
        valid_date,
        description,
        pop,
        daysAway,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Server error." });
  }
});
