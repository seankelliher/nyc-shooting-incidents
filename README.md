[![MIT License on GitHub](https://img.shields.io/github/license/seankelliher/nyc-shooting-incidents?style=flat-square)](/LICENSE.txt)
## NYC Shooting Incidents

Dynamically generated dashboard and map of year-to-date shooting incidents in New York City. The app utilizes Open Data NYC's API to gather a list of individual shootings compiled by the NYPD. From there, it generates a map with pins for each shooting, and charts of statistics. Built with Vue.js, Express.js, and Mapbox. The Express server is used mainly to hide the API's access token in an environmental variable. Fetched data is stored locally to reduce calls to the server. [View working component](https://nyc-shooting-incidents.herokuapp.com). **"Eco" dyno, takes a few seconds to wake up.**

## Project Status

Project meets general accessibility (WACG) and cross-browser requirements. More testing with a dedicated services (e.g., Sauce Labs) would be helpful if deploying to production.

## Project Screen Shots

* Header, Intro, Sites & Times
![screen shot of project](/screenshots/nyc-shooting-incidents-screenshot1.png?s=600)

* Victims, Map
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

## Acknowledgments

* Shooting data from [NYC Open Data](https://data.cityofnewyork.us/Public-Safety/NYPD-Shooting-Incident-Data-Year-To-Date-/5ucz-vwe8).
* API guidance from [SODA Developers](https://dev.socrata.com).
* Readme guidance from [Brenna Martenson](https://gist.github.com/martensonbj/6bf2ec2ed55f5be723415ea73c4557c4).
* Linting guidance from [ESLint](https://eslint.org) and [Stylelint](https://stylelint.io).
* Design guidance from Google's [Material Design](https://material.io/design).
* Accessibility guidance from [Chrome's](https://www.google.com/chrome/) Lighthouse and [Firefox's](https://www.mozilla.org/en-US/firefox/new/) Developer Tools.
* Shields from [Shields](https://shields.io).