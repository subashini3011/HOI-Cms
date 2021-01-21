import './index.scss';
import React, { Component } from 'react';

import ARROW_UP from 'images/arrow-up.png';
import { Row, Col } from 'components/ui';

class StatisticCard extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="statistic-cardwrapper">
        <Row className="statistic-cardwrapper__title">
          <span className="statistic-cardwrapper__title__left">
            {data.name.replace(/_/g, ' ')}
          </span>
        </Row>
        <Row className="statistic-cardwrapper__number">
          <Col span={24}>
            {(data.name.toLowerCase() === 'lifetime_sales' ||
              data.name.toLowerCase() === 'average_order_value') && (
              <span className="statistic-cardwrapper__rupee-symbol">₹</span>
            )}
            {data.value.toLocaleString('en-IN', {
              maximumFractionDigits: 2
            })}
          </Col>
        </Row>
        {data.name.toLowerCase() !== 'lifetime_sales' && (
          <Row className="statistic-cardwrapper__rate">
            <span className="statistic-cardwrapper__rate__number">
              <img src={ARROW_UP} alt="up arrow" />
              &nbsp;{data.rate}%
            </span>
            <span className="statistic-cardwrapper__rate__text">
              &nbsp;Since last month
            </span>
          </Row>
        )}
      </div>
    );
  }
}

export default StatisticCard;

// StatisticCard.propTypes = {
//   data: PropTypes.arrayof(PropTypes.any)
// };

// StatisticCard.defaultProps = {
//   data: []
// };
