const axios = require('axios');

module.exports = function (app, db) {

    app.get('/setUp', (req, res) => {
        res.render('currencies');
    });
    //get all the currencies
    app.post('/setCurrencies', (req, res) => {
        axios.get(`https://openexchangerates.org/api/currencies.json?app_id=595ff3e137dc44b0ada28efbead33081`)
            .then((response) => {
                for (var key in response.data) {
                    var currency = { shortName: key, fullName: response.data[key] };
                    db.collection('currencies').insert(currency, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                res.redirect('/home');
            });
    });

    app.get('/home', (req, res) => {
        
        // get the current date
        var nowDate = new Date();
        var year = (nowDate.getFullYear()).toString();
        var month = (nowDate.getMonth() + 1).toString();
        if (month.length < 2) {
            month = '0' + month;
        }
        var date = (nowDate.getDate()).toString();
        if (date.length < 2) {
            date = '0' + date;
        }
        this.currentDate = `${year}-${month}-${date}`;

        //print all the currencies
        db.collection('currencies').find({}).toArray((err, item) =>{
            if (err) return console.log(err)
            var currenciesObj = {};
            currenciesObj.showing = item;
            res.render('home', currenciesObj);
        })
    });

}