[![MIT License on GitHub](https://img.shields.io/github/license/seankelliher/nyc-shooting-incidents?style=flat-square)](/LICENSE.txt)
## NYC Shooting Incidents

Dashboard on YTD shootings in NYC built Vue.js, Express.js, Node.js, and NYC Open Data. [View working component](https://nyc-shooting-incidents.herokuapp.com). **"Eco" dyno, takes a few seconds to wake up.**

## Project Status

Next steps, I want to do more extensive accessibility and browser testing.

## Project Screen Shots

* Page on desktop
![screen shot of project](/screenshots/nyc-shooting-incidents-screenshot1.png?s=600)

* Page on tablet
![screen shot of project](/screenshots/nyc-shooting-incidents-screenshot2.png?s=600)

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine. The Express server uses the Fetch API. You will need a later version of Node (18+) for this to work. 

Installation:

`npm install`  

To Run Vue:

`npm run dev`  

To Start the Express server:

`npm run start`  

To Visit App:

Visit the localhost port displayed in the terminal after running `npm run dev`. You may need to disable your browser's Cross-Origin Restrictions.

## Reflection

My goal was to build an app that fetches and compiles NYPD data on shooting incidents. The NYPD releases data at the end of each quarter for the previous 12 months. Unfortunately, in NYC, this involves a lot of shootings and a lot of data. I tested different approaches: making multiple calls to the server for smaller amounts of data versus one call for all data. The single fetch offered better results. I fetch all data at once. I then loop through the returned data multiple times to compile the statistics. I also store the data locally in "session storage." If the user leaves and returns during the same session, the data can be pulled from the browser's memory and there is no need to fetch it again from the server. Using "local storage" was also an option but with a downside. If the NYPD updated its data before users cleared their cache, users would miss out on updated data.

## Acknowledgments

* Shooting data from [NYC Open Data](https://data.cityofnewyork.us/Public-Safety/NYPD-Shooting-Incident-Data-Year-To-Date-/5ucz-vwe8).
* API guidance from [SODA Developers](https://dev.socrata.com).
* Readme guidance from [Brenna Martenson](https://gist.github.com/martensonbj/6bf2ec2ed55f5be723415ea73c4557c4).
* Linting guidance from [ESLint](https://eslint.org) and [Stylelint](https://stylelint.io).
* Design guidance from Google's [Material Design](https://material.io/design).
* Accessibility guidance from [Chrome's](https://www.google.com/chrome/) Lighthouse and [Firefox's](https://www.mozilla.org/en-US/firefox/new/) Developer Tools.
* Shields from [Shields](https://shields.io).