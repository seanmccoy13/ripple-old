import React from 'react'
import { Query } from 'react-apollo'
import { GET_MS_LOCAL } from '../../../../../graphql/local/queries'
import SurveyInput from '../SurveyInput'
import Loading from '../../../../common/Loading'
import { GET_SURVEY } from '../../../../../graphql/queries'



const ManagementSurvey = ({ company: { companyName } }) => (

  <Query query={GET_SURVEY} variables={{ companyName, surveyName: 'management' }}>
    {
      ({ data, loading, error, refetch }) => {
        const message = { header: 'updating survey', content: 'please wait while we retrieve your data' }
        if (loading) { return <Loading message={message} /> }
        if (error) { return (<div><p>{`${error}`}</p></div>) }
        if (data.getSurvey && !data.getSurvey.errors) {
          return (<SurveyInput data={data.getSurvey} companyName={companyName} refetch={refetch} />)
        } else {
          return (
            <Query
              query={GET_MS_LOCAL}>
              {
                ({ data: { managementSurvey } }) => (
                  <SurveyInput data={managementSurvey} companyName={companyName} refetch={refetch} />
                )
              }
            </Query>
          )
        }
      }
    }
  </Query>

)


export default ManagementSurvey
