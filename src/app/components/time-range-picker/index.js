import React, { Component } from 'react';
import moment from 'moment';

import { DatePicker, TimePicker } from 'components/ui';
const dateFormat = 'DD/MM/YYYY';
const timeFormat = 'HH:mm:ss';

class TimeRangePicker extends Component {
  render() {
    const {
      startValue,
      endValue,
      startDate,
      startTime,
      endDate,
      endTime,
      handleStartDate,
      handleStartTime,
      handleEndDate,
      handleEndTime,
      disabledStartDate,
      disabledEndDate
    } = this.props;
    return (
      <div className="custom-calender">
        <DatePicker
          size="small"
          disabledDate={disabledStartDate}
          placeholder="Start date"
          title="CUSTOM"
          value={startDate ? moment(startDate, dateFormat) : null}
          format={dateFormat}
          className="header--left__select__time__item a"
          onChange={handleStartDate}
        />
        <TimePicker
          use24Hours
          size="small"
          format={timeFormat}
          value={startTime ? moment(startTime, timeFormat) : null}
          onChange={handleStartTime}
        />
        <span
          className="custom-calender__header__text"
          style={{ marginRight: 10, marginLeft: 10 }}
        >
          to
        </span>
        <DatePicker
          size="small"
          disabledDate={disabledEndDate}
          placeholder="End date"
          value={endDate ? moment(endDate, dateFormat) : null}
          title="CUSTOM"
          format={dateFormat}
          className="header--left__select__time__item"
          onChange={handleEndDate}
        />
        <TimePicker
          value={endTime ? moment(endTime, timeFormat) : null}
          size="small"
          use24Hours
          format={timeFormat}
          onChange={handleEndTime}
        />
      </div>
    );
  }
}

export default TimeRangePicker;
