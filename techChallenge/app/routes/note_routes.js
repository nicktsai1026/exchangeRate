const axios = require('axios');
const validator = require('is-my-date-valid');
const validate = validator({ format: 'YYYY-MM-DD' });

module.exports = function (app, db) {
    
    app.post('/latest', (req, res) => {
        this.inputCurrency = req.body.currency;
        db.collection(`${this.currentDate}`).findOne({ shortName: this.inputCurrency }, (err, item) => {
            if (item == null) {
                axios.get(`https://openexchangerates.org/api/latest.json?app_id=595ff3e137dc44b0ada28efbead33081`)
                    .then((response) => {
                        var data = response.data.rates;
                        for( var key in data) {
                            var currentRate = { shortName: key, rate: data[key] };
                            db.collection(`${this.currentDate}`).insert(currentRate, (err, item) => {
                                if (err) return console.log(err)
                            })
                        }
                        res.redirect('/show');
                    })
            } else {
                res.redirect('/show');
            }
        })
        
    });

    app.get('/error', (req, res) => {
        res.render('error');
    });

    app.get('/show', (req, res) => {
        db.collection(`${this.currentDate}`).findOne({ shortName: this.inputCurrency }, (err, item) => {
            if (err) {
                console.log(err);
            } else {
                var showCurrency = {};
                showCurrency.show = item;
                res.render('display', showCurrency);
            }
        })
    });

    app.post('/historical', (req, res) => {
        this.historicalDate = req.body.date;
        this.historicalCur = req.body.currency;
        var inputDate = new Date(this.historicalDate);
        var dateNow = new Date(this.currentDate);
        //check input date 
        if (!validate(this.historicalDate) || inputDate > dateNow) {
            res.redirect('/error');
        } else {
            //check database
            db.collection(`${this.historicalDate}`).findOne({ shortName: this.historicalCur }, (err, item) => {
                if(item == null) {
                    axios.get(`https://openexchangerates.org/api/historical/${this.historicalDate}.json?app_id=595ff3e137dc44b0ada28efbead33081`)
                        .then((response) => {
                            var data = response.data.rates;
                            for (var i in data) {
                                var historical = { shortName: i, rate: data[i] };
                                db.collection(`${this.historicalDate}`).insert(historical, (err, result) => {
                                    if (err) return console.log(err)
                                });
                            }
                            res.redirect('/showHistorical');
                        })
                } else {
                    res.redirect('/showHistorical');
                }
            })
        }
    });

    app.get('/showHistorical', (req, res) => {
        db.collection(this.historicalDate).findOne({ shortName: this.historicalCur }, (err, item) => {
            if (err) return console.log(err)
            
            //add a historical date in the obj
            item.date = this.historicalDate;
            
            var showHistoricalCurrency = {};
            showHistoricalCurrency.historicalCurrency = item;
            res.render('display', showHistoricalCurrency);
        });
    });

};