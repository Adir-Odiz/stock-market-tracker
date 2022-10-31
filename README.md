# stock-market-tracker
Midterm Front-End project built by Adir Odiz for HackerU's .NET Course

Class ID: D130222ER
Email: odizadir@gmail.com

This project was built on React, using Vite
The site is dedicated to monitor stocks from New York Stock Exchance (or Wall Street)

Stock information, prices at open/close etc. are fetched from an api called FinnHub - https://finnhub.io/
this site allows fetching up to 60 calls/minute for the free API key granted.

For styling, Iv'e been using Bootstrap.
For chart designing and information sorting I used https://apexcharts.com/ 

The main overview page let's the user search for a stock symbol using the autocomplete component, which adds the chosen stock to the list with real time data. The user can then click on the stock from the table in order to dive deeper and view the chart, price history and manipulate time periods.
Back in the main overview page, the user can delete a stock using the delete button

Regarding an "update" functionality; due to the nature of stocks, the user cannot write into the API and there shouldn't be an option to "update" a stock info since it is not up to the user to determine that kind of information. Therefore i'm open to suggestions - Might add an update feature in some sort of way so the CRUD requirement is fully implemented.
