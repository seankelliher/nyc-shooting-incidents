[![MIT License on GitHub](https://img.shields.io/github/license/seankelliher/nyc-shooting-incidents?style=flat-square)](/LICENSE.txt)
## NYC Shooting Incidents

Dashboard on YTD shootings in NYC built Vue.js, Express.js, Node.js, and NYC Open Data. [View working component](https://nyc-shooting-incidents.herokuapp.com). **"Eco" dyno, takes a few seconds to wake up.**

## Project Status

RENOVATING: modifying design and functionality (from Options to Composition API). Need to add error handling and conduct testing for WACG, responsiveness, and cross browser functionality.

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

I wanted to build an app that pulls NYPD data on shooting incidents in New York City, compiles it, and offers "overviews" as to when and where shootings occur and who are the perpetrators and victims.

The initial challenge was understanding how the NYPD categorizes shootings. For example, if the shooting is labeled as at a liquor store, was it inside the store or outside it? How are incidents where a single person shoots multiple people, or vice versa, categorized?

Once building, I created the app to pull data from the NYC Open Data server, store it in a browser's local storage, and then utilize local storage for future requests. I wanted to reduce calls to the server.

## Acknowledgments

* Shooting data from [NYC Open Data](https://data.cityofnewyork.us/Public-Safety/NYPD-Shooting-Incident-Data-Year-To-Date-/5ucz-vwe8).
* API guidance from [SODA Developers](https://dev.socrata.com).
* Readme guidance from [Brenna Martenson](https://gist.github.com/martensonbj/6bf2ec2ed55f5be723415ea73c4557c4).
* Linting guidance from [ESLint](https://eslint.org) and [Stylelint](https://stylelint.io).
* Design guidance from Google's [Material Design](https://material.io/design).
* Accessibility guidance from [Chrome's](https://www.google.com/chrome/) Lighthouse and [Firefox's](https://www.mozilla.org/en-US/firefox/new/) Developer Tools.
* Shields from [Shields](https://shields.io).