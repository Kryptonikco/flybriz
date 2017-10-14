import React from 'react';
import {
  DateRangePicker,
} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';


class DateSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  changeDates({
    startDate,
    endDate
  }) {
    this.props.changeDatesFn({
      startDate,
      endDate
    });
  }

  onDatesChange(startDate, endDate) {
    this.changeDates({
      startDate,
      endDate
    });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    console.log('DateSelector#render this.props', this.props);
    return (
      <DateRangePicker
        displayFormat={'DD/MM/YYYY'}
        startDate={this.props.startDate} // momentPropTypes.momentObj or null,
        endDate={this.props.endDate} // momentPropTypes.momentObj or null,
        onDatesChange={this.props.changeDatesFn} // PropTypes.func.isRequired, // PropTypes.func.isRequired
        focusedInput={this.state.focusedInput}
        onFocusChange={this.onFocusChange} />
    );
  }
}

export default DateSelector;