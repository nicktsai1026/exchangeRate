const axios = require('axios');

module.exports = function (app, db) {

    app.post('/period', (req, res) => {
        this.searchRange = req.body.search_range;
        this.searchCurrency = req.body.currency;
        var nowDate = new Date();
        var dateArr = [];
        var i = 0;
        //check search range
        if(this.searchRange == undefined) {
            res.redirect('/error');
        }else {
            //generate date
            do {
                var previousD = nowDate.setDate(nowDate.getDate() - 1);
                var previousDate = new Date(previousD);
                dateArr.push(previousDate);
                i++;
            } while (i < this.searchRange);

            //make date type is yyyy-mm-dd
            var dateArrNoTime = [];
            dateArr.forEach((val) => {
                var year = (val.getFullYear()).toString();
                var month = (val.getMonth() + 1).toString();
                if (month.length < 2) {
                    month = '0' + month;
                }
                var date = (val.getDate()).toString();
                if (date.length < 2) {
                    date = '0' + date;
                }
                var newDateWithoutTime = `${year}-${month}-${date}`;
                dateArrNoTime.push(newDateWithoutTime);
            });
            //check database one by one
            dateArrNoTime.forEach((val) => {
                db.collection(val).findOne({ shortName: this.searchCurrency }, (err, item) => {
                    if (item == null) {
                        axios.get(`https://openexchangerates.org/api/historical/${val}.json?app_id=595ff3e137dc44b0ada28efbead33081`)
                            .then((response) => {
                                var data = response.data.rates;
                                for (var i in data) {
                                    var historical = { shortName: i, rate: data[i] };
                                    db.collection(val).insert(historical, (err, result) => {
                                        if (err) return console.log(err)
                                    });
                                }
                            })
                        }
                    })
                })
            res.redirect('/showPeriod');
            this.showArrDate = dateArrNoTime;
        }
    });
    
    app.get('/showPeriod', (req, res) => {
        var periodDateArr = this.showArrDate;
        var periodObj = {};
        var firstObj= {};
        var counter = 0;

        periodDateArr.forEach((val) => {
            //get all the rates
            db.collection(val).findOne({ shortName: this.searchCurrency }, (err, item) => {
                //make object key is date, value is rate
                firstObj[val] = item.rate;
                counter++;
                if (counter == periodDateArr.length) {
                    //make date start from earlies until now and push to array
                    var dateKeys = Object.keys(firstObj).sort();
                    var allDateArr = [];
                    var allRateArr = [];
                    dateKeys.forEach((val) => {
                        for (var i in firstObj) {
                            if (val == i) {
                                allDateArr.push([i].toString());
                                allRateArr.push(firstObj[i]);
                            }
                        }
                    });
                    periodObj.allDates = allDateArr;
                    periodObj.allRates = allRateArr;
                    periodObj.selectedCurrency = this.searchCurrency;
                    if(this.searchRange == '84') {
                        periodObj.selectedDate = 'In the last three months';
                    }else {
                        periodObj.selectedDate = 'In the last six months';
                    }
                    res.render('chart', periodObj);
                }
            })
        })
    });

}