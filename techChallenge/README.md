# Exchange Rate

Website providing quick check of the current and past currency rates, and charts of past rates.
* Link:[exchangeRate](http://128.199.115.203:8080/home)

## Getting Started

Follow the instructions to get a copy of the project and run it on your local machine for development on a live system.

### Install Node.js

Node.js
Run the following commands to add the NodeSource repository to your server.
```
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```
```
     sudo apt-get install -y nodejs
     sudo apt-get install -y build-essential
```
### Install node packages

Run the following command
```
    npm install
```

## Running the tests

In spec folder, run the following command
```
    jasmine <file_name>.spec.js
```

## Libraries used

1. express
2. body-parser
3. express-handlebars
4. axios
5. mongodb
6. is-my-date-valid
7. chart.js

# How to use the website

1. To check the latest rate
    * Select a currency and click check.

2. To check past rates
    * Type in a date that you want to search.
    * Select a currency and click check.
3. To see a chart
    - Select a period of time.
    - Select a currency and click check.

## Author

* **Nick Tsai** - (git:nicktsai1026)

## Acknowledgments

* [openexchangerates.org](https://openexchangerates.org/)
