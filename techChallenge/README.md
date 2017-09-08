# Exchange Rate

Quick check the current currency rate and historical date currency rate. It also provides a period time and show up with a chart.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

Node.js
Run the following commands to add the NodeSource repository to your server.
```
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```
```
     sudo apt-get install -y nodejs
     sudo apt-get install -y build-essential
```
### Installing

Install packages,
Run the following command
```
    npm install
```

## Running the tests

In spec folder, run the following command
```
    jasmine <file_name>.spec.js
```

## Built With

1. express
2. body-parser
3. express-handlebars
4. axios
5. mongodb
6. is-my-date-valid
7. chart.js

## How to use

1. Latest rate
    - Select a currency and check.

2. Historical rate
    - Type a date that you want to search.
    - Select a currency and check.
3. Chart
    - Select a period.
    - Select a currency and check.
## Authors

* **Nick Tsai** - (git:nicktsai1026)

## Acknowledgments

* [openexchangerates.org](https://openexchangerates.org/)
