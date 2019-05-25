import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Input } from 'semantic-ui-react'

const uploadCSV = gql`
mutation($companyName: String!, $file: Upload!) {
  uploadEmployeesFromCsv(companyName: $companyName, file: $file) {
    path
    message
  }
}
`

const CSVUpload = ({ companyName }) => (
  <Mutation mutation={uploadCSV}>
    {
      imageUpload => {

        return (
          <Input
            type="file"
            required
            onChange={({
              target: {
                validity,
                files: [file]
              }
            }) => validity.valid && imageUpload({ variables: { companyName, file } })}
          />
        )
      }
    }
  </Mutation>
)

export default CSVUpload
