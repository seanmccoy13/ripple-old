import React, { lazy, Suspense } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { GET_EMPLOYEES, GET_RESULTS } from '../../graphql/queries';
import { ADD_USERS, CACHE_RESULTS } from '../../graphql/local/mutations';
import DisplayErrors from '../common/DisplayErrors';
import Loading from '../common/Loading';
import { WrappedAuthRoute } from './WrappedAuthRoute';
import {
  StyledMenuInnerDiv,
  StyledMenuOuterDiv,
} from './components/menu/styles';
import ResultsMenuItems from './components/menu/ResultsMenuItems';
import LogoutButton from '../common/LogoutButton';
import DatePicker from './components/DatePicker';
import {
  StyledContainerDiv,
  HiddenH2,
  HiddenImg,
} from './components/common/style';
import * as images from '../../images';

const Linegraph = lazy(() => import('./components/linegraph'));
const Results = lazy(() => import('./components/table'));
const onPrint = () => window.print();

const linkStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'teal',
  minHeight: 40,
};

const ResultsPage = ({ location: { pathname }, user: { companyName } }) => {
  return (
    <Query
      query={GET_RESULTS}
      variables={{ companyName }}
      pollInterval={300000}
      fetchPolicy={'network-only'}
    >
      {({ loading, error, data: { getResults } }) => {
        const message = {
          header: 'fetching results',
          content: 'please wait while we retrieve your data',
        };
        if (loading) {
          return <Loading message={message} />;
        }
        if (error) {
          return (
            <div>
              <p>{`${error}`}</p>
            </div>
          );
        }
        const { results, errors } = getResults;
        if (errors) {
          return <DisplayErrors errors={errors} />;
        }
        return (
          <Query query={GET_EMPLOYEES} variables={{ companyName }}>
            {({ loading, error, data: { getEmployees } }) => {
              if (loading) {
                return <Loading />;
              }
              if (error) {
                return (
                  <div>
                    <p>{`${error}`}</p>
                  </div>
                );
              }
              if (getEmployees.errors) {
                return <DisplayErrors errors={getEmployees.errors} />;
              }
              const { employees } = getEmployees;
              return (
                <Mutation mutation={ADD_USERS} variables={{ users: employees }}>
                  {addUsers => {
                    return (
                      <Mutation
                        mutation={CACHE_RESULTS}
                        variables={{ results: { results } }}
                      >
                        {cacheResults => {
                          const update = () => {
                            cacheResults();
                            addUsers();
                          };
                          const cp = companyName
                            .trim()
                            .split(' ')
                            .join('')
                            .toLowerCase();
                          return (
                            <StyledMenuOuterDiv>
                              <StyledMenuInnerDiv>
                                <Menu color="black" stackable>
                                  <Menu.Item
                                    active={pathname === '/results/graph'}
                                  >
                                    <Link
                                      to="/results/graph"
                                      onClick={update}
                                      style={linkStyle}
                                    >
                                      Graph
                                    </Link>
                                  </Menu.Item>
                                  <Menu.Item
                                    active={pathname === '/results/dashboard'}
                                  >
                                    <Link
                                      to="/results/dashboard"
                                      onClick={update}
                                      style={linkStyle}
                                    >
                                      Dashboard
                                    </Link>
                                  </Menu.Item>
                                  <ResultsMenuItems
                                    users={employees}
                                    pathname={pathname}
                                    update={update}
                                  />
                                  <Menu.Menu position="right">
                                    <Menu.Item name="print" onClick={onPrint} />
                                    <Menu.Item>
                                      <LogoutButton />
                                    </Menu.Item>
                                  </Menu.Menu>
                                </Menu>
                              </StyledMenuInnerDiv>
                              <DatePicker update={update} />
                              <StyledContainerDiv>
                                <HiddenH2>{companyName}</HiddenH2>
                                <HiddenImg
                                  src={images[cp].logo}
                                  alt={companyName}
                                />
                                <Suspense fallback={<Loading />}>
                                  <WrappedAuthRoute
                                    path="/results/graph"
                                    component={Linegraph}
                                  />
                                  <WrappedAuthRoute
                                    path="/results/dashboard"
                                    component={Results}
                                  />
                                  <WrappedAuthRoute
                                    exact
                                    path="/results"
                                    component={Linegraph}
                                  />
                                </Suspense>
                              </StyledContainerDiv>
                            </StyledMenuOuterDiv>
                          );
                        }}
                      </Mutation>
                    );
                  }}
                </Mutation>
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default ResultsPage;
