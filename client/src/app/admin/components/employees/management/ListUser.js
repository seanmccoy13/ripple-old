import React from 'react'
import { Mutation } from 'react-apollo'
import { REMOVE_EMPLOYEE } from '../../../../../graphql/mutations'
import EditUser from './EditUser'


const ListUser = ({ user }) => (
  <Mutation mutation={REMOVE_EMPLOYEE} variables={{ id: user._id }}>
    {
      removeEmployee => <EditUser user={user} delete={removeEmployee} />
    }
  </Mutation>
)



export default ListUser