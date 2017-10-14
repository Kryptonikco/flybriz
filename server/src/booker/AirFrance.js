const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  // timeout: 10000,
});
const  moment = require('moment');

module.exports = ({
  departure,
  arrival,
}) => new Promise((resolve, reject) => {
  console.log('booker/AirFrance departure', departure);
  console.log('booker/AirFrance arrival', arrival);
  const departureDate = moment(departure.date);
  const arrivalDate = moment(arrival.date);

  nightmare
  .goto('https://www.airfrance.fr/en')
  .type('#minibe__od--out', departure.city)
  .wait(1000)
  .click('#ac__list--minibe__od--out li:nth-child(1)')
  .type('#minibe__od--in', arrival.city)
  .wait(1000)
  // .click('#ac__list--minibe__od--in li:nth-child(1)')
  .click('#minibe__button--calendar_out')
  .click(`#calendar.out #calendar--${departureDate.format('YYYYMMDD')}`)
  .wait(1000)
  .click(`#calendar.in #calendar--${arrivalDate.format('YYYYMMDD')}`)
  .wait(1000)
  .click('#minibe__button--search')
  .wait(15000)
  .evaluate(() => {
    const regex = / €/gi;
    const oneWayString = document
      .querySelector('#idCalendarOutbound li.flight__calendar__list__item.selected .calendar__price')
      .innerText.replace(regex, '');
    const returnString = document
      .querySelector('#idCalendarInbound li.flight__calendar__list__item.selected .calendar__price')
      .innerText.replace(regex, '');

    
    return {
      oneWay: parseInt(oneWayString, 10),
      return: parseInt(returnString, 10),
      // dates: [departureDate, arrivalDate],
      website: 'AirFrance'
    };
  })
  .end()
  .then((result) => {
    console.log('booker/AirFrance result', result);
    const data = result;
    data.dates = [departureDate, arrivalDate];
    data.cities = [departure.city, arrival.city];
    resolve(data);
  })
  .catch((err) => {
    console.log('booker/AirFrance err', err);
    reject(err);
  });
});