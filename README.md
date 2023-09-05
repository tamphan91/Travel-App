# Front End Web Developer Nanodegree - Capstone Project: Travel Planner Web App

This is a project to [Udacity](https://www.udacity.com/us)'s Front End Web Developer nanodegree.

## Overview

This is a single page web app, which includes a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast.

It works by getting a desired trip location and date from the user, then displaying weather and an image of the location using information obtained from external APIs.

## Usage
To use this app, you'll need to get APIs from <a href="https://www.weatherbit.io/account/dashboard">weatherbit</a>, <a href="https://pixabay.com/api/docs/">pixabay</a>, <a href="https://www.geonames.org/export/geonames-search.html">geonames</a>. Make sure you have node installed into your desktop, as you'll be using the **"npm"** command. So the first step is after you downloaded this file, you'll need to create an .env file, which should be in the same directory as the package.json. Then save your XXX_API_KEY into that file.

````
PIXABAY_API_KEY=**********
GEONAMES_API_KEY=**********
WEATHERBIT_API_KEY=**********
````

Then you'll need to run the following command line on your terminal, so it has all the required packages. It should create a node_modules folder, so make sure you have that.

````
npm install
````

Afterwards in the terminal, run the command:

````
npm run build-prod
````

This command will create a dist folder that is in the same directory as your src folder, and the dist folder will have all your files in a webpack format. Another reason to run this command is because the server is pointed into that folder as well.


To run the web application you can run the following command line in your terminal.
````
npm start
````
Then in your browser, go to **localhost:8081** where your web app is at. Your web application should look like this and when you enter a url into the textbox it should retrieve you the analysis.

## Starter Code

I used a starter code provided by Udacity - <a href="https://github.com/udacity/fend/tree/refresh-2019" target="_blank">Link to the starter code</a>
