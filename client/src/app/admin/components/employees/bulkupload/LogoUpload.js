import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Input } from 'semantic-ui-react'

export const IMAGE_UPLOAD = gql`
  mutation imageUpload(
    $companyName: String!,
    $logo: Boolean,
    $file: Upload!
  ){
    imageUpload(
      companyName: $companyName,
      logo: $logoLarge,
      file: $file
    ){
      message
      path
    }
  }
`
const LogoUpload = ({ companyName, logo }) => (
  <Mutation mutation={IMAGE_UPLOAD}>
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
            }) => validity.valid && imageUpload({ variables: { companyName, logo, file } })}
          />
        )
      }
    }
  </Mutation>
)

export default LogoUpload
