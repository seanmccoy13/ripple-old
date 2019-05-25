import React from 'react'
import { Link } from 'react-router-dom'
import { Button, List } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { GET_EMPLOYEE_BY_MOBILEID, GET_SURVEY } from '../../../../graphql/queries'
import SurveyNotAvailable from '../common/SurveyNotAvailable'
import { Loading, Error, LINK } from '../common/style'
import Welcome from '../welcome/Welcome'

const StaffLogin = ({ match }) => (
  <Query query={GET_EMPLOYEE_BY_MOBILEID} variables={{ mobileId: match.params.id }} fetchPolicy={'network-only'}>
    {
      ({ loading, error, data, networkStatus }) => {
        if (loading) { return (<Loading><h2>...loading</h2></Loading>) }
        if (networkStatus === 4) { return <Loading><h2>Refetching!</h2></Loading> }
        if (error) { return <Error><h2>{`Error!: ${error}`}</h2></Error> }
        const { getEmployeeByMobileId } = data
        const {
          email,
          companyName,
          surveyName,
          surveyOwed,
          firstTime,
          firstName,
          lastName,
          errors
        } = getEmployeeByMobileId

        if (!surveyOwed || !surveyName) {
          return (<SurveyNotAvailable />)
        }
        if (errors) {
          return (
            <Error>
              <List>
                {errors.map(error => <List.Item key={error.path}><h2>{error.message}</h2></List.Item>)}
              </List>
              <Button inverted size="massive" fluid>
                <Link to={`/id/${match.params.id}`} style={LINK}>
                  login
                </Link>
              </Button>
            </Error>
          )
        }
        return (
          <Query query={GET_SURVEY} variables={{ companyName, surveyName }}>
            {
              ({ data: { getSurvey }, loading, error }) => {
                if (loading) { return (<Loading><h2>...loading</h2></Loading>) }
                if (error) { return <Error><h2>{`Error!: ${error}`}</h2></Error> }
                return (
                  <Welcome
                    email={email}
                    survey={getSurvey}
                    userDetails={getEmployeeByMobileId}
                    firstName={firstName}
                    lastName={lastName}
                    companyName={companyName}
                    firstTime={firstTime}
                    mobileId={match.params.id}
                  />

                )
              }
            }
          </Query>
        )

      }
    }
  </Query>
)

export default StaffLogin