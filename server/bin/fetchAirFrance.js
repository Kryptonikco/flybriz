var moment = require('moment');

const Booker = require('../src/booker/AirFrance');

const isSendingText = false;
const isSendingEmail = true;

const toMail = 'me@jenaiccambre.com';
const mailer = require('../src/Mailer');

const DATE_FORMAT = 'YYYY-MM-DD';

var config = {
  departure: {
    city: 'paris',
    date: '2017-10-16',
  },
  arrival: {
    city: 'athens',
    date: '2017-10-23'
  }
};

Booker({
  departure: config.departure,
  arrival: config.arrival,
}).then(function (result) {
  console.log('bin/fetchAirFrance result', result);
  const msg = `Lowest price
One way: ${result.oneWay} €
Return: ${result.return} €
Total: ${result.oneWay + result.return} €`;
  if (isSendingText === true) {

  }
  if (isSendingEmail === true) {
    mailer({
      to: toMail,
      msg,
      cities: result.cities,
    });
  }
})
.catch(function (error) {
  console.error('Search failed:', error);
});