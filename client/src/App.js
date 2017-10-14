import React, { Component } from 'react';
import DateSelector from './components/core/DateSelector';
import moment from 'moment';
import qs from 'qs';

const WEBSITES = [
  'Transavia',
  'AirFrance',
];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      departureCity: 'paris',
      arrivalCity: '',
      startDate: moment().add(1, 'day'),
      endDate: moment().add(8, 'day'),
      fares: [/*{
        website: 'Transavia',
        oneWay: 96,
        return: 105
      }*/],
    };

    this.onChangeDepartureCity = this.onChangeDepartureCity.bind(this);
    this.onChangeArrivalCity = this.onChangeArrivalCity.bind(this);
    this.changeDates = this.changeDates.bind(this);
    this.onClickFetchFares = this.onClickFetchFares.bind(this);
  }

  async componentDidMount() {
    // const res = await fetch('/api/book?website=Transavia&departureCity=paris&arrivalCity=crète&departureDate=2017-10-16&arrivalDate=2017-10-23');
    // const json = await res.json();
    // const fares = this.state.fares;
    // fares.push(json);
    // this.setState({
    //   fares,
    // });
  }

  changeArrivalCity({
    city,
  }) {
    this.setState({
      arrivalCity: city,
    });
  }

  changeDates({
    startDate,
    endDate
  }) {
    console.log('App.js#changeDates startDate', startDate);
    const start = startDate || this.state.startDate;
    const end = endDate || this.state.endDate;
    this.setState({
      startDate: start,
      endDate: end,
    })
  }

  changeDepartureCity({
    city,
  }) {
    this.setState({
      departureCity: city,
    });
  }

  async fetchFare({
    website,
    departureCity,
    arrivalCity,
    departureDate,
    arrivalDate,
  } = {}) {
    const query = {
      website,
      departureCity,
      arrivalCity,
      departureDate,
      arrivalDate,
    };
    const queryString = qs.stringify(query);
    const res = await fetch(`api/book?${queryString}`);
    const json = await res.json();
    return json;
  }

  async fetchFares() {
    const {
      departureCity,
      arrivalCity,
      startDate,
      endDate,
      fares,
    } = this.state;
    await this.setState({
      isLoading: true,
    });
    const fare = await this.fetchFare({
      website: WEBSITES[0],
      departureCity,
      arrivalCity,
      departureDate: startDate.format('YYYY-MM-DD'),
      arrivalDate: endDate.format('YYYY-MM-DD')
    });
    fares.push(fare);
    await this.setState({
      fares,
    });

    const fare2 = await this.fetchFare({
      website: WEBSITES[1],
      departureCity,
      arrivalCity,
      departureDate: startDate.format('YYYY-MM-DD'),
      arrivalDate: endDate.format('YYYY-MM-DD')
    });
    fares.push(fare2);
    await this.setState({
      fares,
      isLoading: false,
    });

  }

  onClickFetchFares(e) {
    this.fetchFares();
  }

  onChangeArrivalCity(e) {
    this.changeArrivalCity({
      city: e.target.value,
    });
  }
  onChangeDepartureCity(e) {
    this.changeDepartureCity({
      city: e.target.value,
    });
  }

  renderFares(index) {
    const {
      fares,
    } = this.state;
    if (fares.length === 0) {
      return null;
    }
    return (
      <div key={index} className="row">
        <div className="col-sm-12">
          <ul className="list-group">
            {fares.map((fare) => 
              <li className="list-group-item">
                {fare.website} <span className="badge badge-secondary">{fare.oneWay + fare.return} €</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }

  renderForm(index) {
    const {
      isLoading,
    } = this.state;
    const isLoadingClasses = isLoading ?
      'btn btn-secondary' :
      'btn btn-primary';
    return (
      <div key={index} className="row">
        <div className="col-sm-6">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">City departure</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={this.state.departureCity}
                onChange={this.onChangeDepartureCity} />
            </div>  
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">City arrival</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={this.state.arrivalCity}
                onChange={this.onChangeArrivalCity} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Date</label>
              <DateSelector
                startDate={this.state.startDate}
                endDate={this.state.endDate} 
                changeDatesFn={this.changeDates} />
            </div>  
            <button
              type="button"
              className={isLoadingClasses}
              onClick={this.onClickFetchFares}>
              {isLoading ? 'Loading...' : 'Search'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar sticky-top navbar-dark bg-dark">
          <span className="h1" className="navbar-brand mb-0">Ticket booking</span>
        </nav>
        <div className="container-fluid">
          {this.renderForm(0)}
          {this.renderFares(1)}
        </div>
      </div>
    );
  }
}

export default App;
