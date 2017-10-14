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
  console.log('booker/Transavia departure', departure);
  console.log('booker/Transavia arrival', arrival);
  const departureDate = moment(departure.date);
  const arrivalDate = moment(arrival.date);

  nightmare
  .goto('https://www.transavia.com/en-UK/home/')
  .type('#routeSelection_DepartureStation-input', departure.city)
  .click('.fake-selectfield ol.results li:nth-child(1)')
  .type('#routeSelection_ArrivalStation-input', arrival.city)
  .click('.fake-selectfield ol.results li:nth-child(1)')
  .click('.desktop .HV-gc .textfield:nth-of-type(1) .datepicker-trigger')
  .wait(1000)
  .click(`.is-visible td[data-day="${departureDate.format('D')}"][data-month="${departureDate.format('MM')}"][data-year="${departureDate.format('YYYY')}"]`)
  .click('.desktop .HV-gc .textfield:nth-of-type(2) .datepicker-trigger')
  .wait(1000)
  .click(`.is-visible td[data-day="${arrivalDate.format('D')}"][data-month="${arrivalDate.format('MM')}"][data-year="${arrivalDate.format('YYYY')}"]`)
  .click('.component_search-panel .desktop  button[type="submit"]')
  .wait(10000)
  .evaluate(() => {
    const regex = new RegExp('€ ', 'gi');
    const priceCompare = (a, b) => {
      console.log(a, b);
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    };
    const oneWayEls = document.querySelectorAll('.flight.outbound .resultsPanelWrapper .price');
    const oneWayPrices = [];
    [].forEach.call(oneWayEls, function(el) {
      // do whatever
      oneWayPrices.push(parseInt(el.innerText.replace(regex, ''), 10));
    });

    const returnEls = document.querySelectorAll('.flight.inbound .resultsPanelWrapper .price');
    const returnPrices = [];
    [].forEach.call(returnEls, function(el) {
      // do whatever
      returnPrices.push(parseInt(el.innerText.replace(regex, ''), 10));
    });

    const oneWayPrice = oneWayPrices.sort(priceCompare);
    const returnPrice = returnPrices.sort(priceCompare);
    return {
      oneWay: oneWayPrice[0],
      return: returnPrice[0],
      // dates: [departureDate, arrivalDate],
      website: 'Transavia'
    };
  })
  .end()
  .then((result) => {
    console.log('booker/Transavia result', result);
    const data = result;
    data.dates = [departureDate, arrivalDate];
    data.cities = [departure.city, arrival.city];
    resolve(data);
  })
  .catch((err) => {
    console.log('booker/Transavia err', err);
    reject(err);
  });
});