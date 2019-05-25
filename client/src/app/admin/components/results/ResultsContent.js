import React, { Component } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { GET_DATE_RANGE_LOCAL } from '../../../../graphql/local/queries';
import DatePicker from '../../../results/components/DatePicker';
import LineGraph from './LineGraph';
import * as images from '../../../../images';

import {
  StyledInline,
  StyledResults,
  ResultsContainerDiv,
  HiddenH2,
  HiddenImg,
} from './styles';
import SelectionMenu from './SelectionMenu';
import ResultsContainer from './ResultsContainer';

export default class ResultsContent extends Component {
  state = {
    username: '',
    participant: '',
    manager: '',
    filtered: [],
  };
  filterResults = ({ username, participant, manager }) => {
    const filtered = this.props.results.filter(
      result => result.participant === participant || result.manager === manager
    );
    this.setState({
      username,
      filtered,
      participant,
      manager,
    });
  };
  render() {
    const { companyName, pathname, users } = this.props;
    const cp = companyName
      .trim()
      .split(' ')
      .join('')
      .toLowerCase();

    return (
      <Query query={GET_DATE_RANGE_LOCAL}>
        {({ data: { date } }) => {
          const resultsProps = {
            date,
            results: this.state.filtered,
            user: { companyName },
            username: this.state.username,
          };
          if (pathname === '/admin-dashboard/results/graph') {
            return (
              <ResultsContainerDiv>
                <HiddenH2>{companyName}</HiddenH2>
                <HiddenImg
                  src={images[cp] ? images[cp].logo : images.ripple.logo}
                />
                <DatePicker />
                <StyledResults>
                  <LineGraph
                    companyName={companyName}
                    results={this.props.results}
                    date={date}
                  />
                </StyledResults>
              </ResultsContainerDiv>
            );
          }
          return (
            <ResultsContainerDiv>
              <HiddenH2>{companyName}</HiddenH2>
              <HiddenImg
                src={images[cp] ? images[cp].logo : images.ripple.logo}
              />
              <StyledInline>
                <SelectionMenu
                  users={users}
                  companyName={companyName}
                  filterResults={this.filterResults}
                />
              </StyledInline>
              <DatePicker />
              <ResultsContainer {...resultsProps} />
            </ResultsContainerDiv>
          );
        }}
      </Query>
    );
  }
}

ResultsContent.propTypes = {
  companyName: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};
