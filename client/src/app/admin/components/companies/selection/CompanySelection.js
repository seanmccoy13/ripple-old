import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { UPDATE_COMPANY, ADD_COMPANIES_LOCAL } from '../../../../../graphql/local/mutations'
import { GET_COMPANIES } from '../../../../../graphql/queries'
import CompanyDropdown from './CompanyDropdown'
import Loading from '../../../../common/Loading'

const CompanySelection = () => {

  return (
    <Query query={GET_COMPANIES} pollInterval={2000}>
      {
        ({ data: { getCompanies }, loading }) => {
          if (loading) { return <Loading /> }
          return (
            <Mutation mutation={ADD_COMPANIES_LOCAL} variables={{ companies: [...getCompanies] }}>
              {
                addCompanies => (
                  <Mutation mutation={UPDATE_COMPANY}>
                    {
                      updateCompany => {
                        const update = ({ companyName }) => {
                          addCompanies()
                          updateCompany({ variables: { key: 'companyName', value: companyName } })
                        }
                        return (
                          <CompanyDropdown update={update} data={getCompanies} />
                        )
                      }
                    }
                  </Mutation>
                )
              }
            </Mutation>
          )
        }
      }
    </Query>
  )
}

export default CompanySelection
