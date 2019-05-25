import React from 'react'
import { Mutation } from 'react-apollo'
import { List } from 'semantic-ui-react'
import { REMOVE_GROUP } from '../../../../../graphql/local/mutations'

const GroupList = ({ groups }) => (
  <Mutation mutation={REMOVE_GROUP}>
    {
      removeGroup => (
        <List>
          {
            groups ? (
              groups.map((group, i) => (
                <List.Item
                  key={group + i}
                  onClick={
                    e => {
                      e.preventDefault()
                      removeGroup({ variables: { group } })
                    }
                  }
                  style={{ listStyleType: 'none' }} >
                  <List.Icon name='delete' />
                  <List.Content>{group}</List.Content>
                </List.Item>
              )
              )
            )
              : (
                <List.Item
                  key={0}
                  style={{ listStyleType: 'none' }} >
                  <List.Content>no Groups to display</List.Content>
                </List.Item>
              )

          }
        </List>
      )
    }
  </Mutation>
)


export default GroupList