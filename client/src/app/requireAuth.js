import React from 'react'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import currentUserQuery from './queries/CurrentUser'

export default (WrappedComponent) => {
  const RequireAuth = ({ data, ...rest }) => {
    if (!data.loading && !data.user) return <Redirect to="/" />
    return <WrappedComponent {...rest} />
  }
  return graphql(currentUserQuery)(RequireAuth)
}
