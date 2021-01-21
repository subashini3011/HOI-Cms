import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import StatisticCard from 'components/statisticCard';
import { Row, Col, Skeleton } from 'components/ui';
import { getcommonUsers } from '../../redux/actions/commonUsersActions';
// import Loading from 'components/loading';
import './index.scss';

class StatisticCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commonusers: [],
      isLoading: false,
      totalCard: 5
    };
  }

  // componentDidMount() {
  //   const { getcommonUsers } = this.props;
  //   getcommonUsers();
  // }

  // componentWillReceiveProps(nextProps) {
  //   const { commonUsersResponse } = this.props;
  //   if (
  //     nextProps.commonUsersResponse &&
  //     nextProps.commonUsersResponse !== commonUsersResponse
  //   ) {
  //     if (
  //       nextProps.commonUsersResponse.error === 0 &&
  //       nextProps.commonUsersResponse.content
  //     ) {
  //       this.setState({
  //         commonusers: nextProps.commonUsersResponse.content,
  //         isLoading: false
  //       });
  //     }
  //   }
  // }

  render() {
    let dom = [];
    const { isLoading, totalCard, commonusers } = this.state;
    const { statisticCardData } = this.props;
    if (isLoading) {
      for (let i = 0; i < totalCard; i += 1) {
        dom.push(
          <Col
            style={{ marginBottom: '2rem' }}
            className="statistic-card__item"
            key={i}
          >
            <div
              style={{
                backgroundColor: 'white',
                minHeight: '14.5rem',
                padding: '0 2rem'
              }}
            >
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          </Col>
        );
      }
    } else {
      dom = statisticCardData.map(item => {
        return (
          <Col
            style={{ marginBottom: '2rem' }}
            className="statistic-card__item"
            key={item.type}
          >
            <StatisticCard data={item} />
          </Col>
        );
      });
    }

    return (
      <Row gutter={20} className="statistic-card">
        {dom}
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    commonUsersResponse: state.commonUsers.commonUsersResponse
  };
}

export default connect(
  mapStateToProps,
  {
    getcommonUsers
  }
)(StatisticCardContainer);

StatisticCardContainer.propTypes = {
  commonUsersResponse: PropTypes.oneOf([PropTypes.objectOf]),
  getcommonUsers: PropTypes.func.isRequired
};

StatisticCardContainer.defaultProps = {
  commonUsersResponse: []
};
