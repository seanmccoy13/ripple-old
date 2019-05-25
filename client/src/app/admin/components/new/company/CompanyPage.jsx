import React, { Component } from 'react'
import { Icon, Header, Divider } from 'semantic-ui-react'
import CompanyInput from './CompanyInput'
import GroupInput from './GroupInput'
import GroupList from './GroupList'

export default class CompanyPage extends Component {
  render() {
    const { company } = this.props
    const { companyName, groups } = company

    return (
      <div>
        <Header as="h1" icon textAlign="center" size="large" color={companyName ? 'black' : 'red'}>
          <Icon
            name="building"
            size="big"
            color={companyName ? 'black' : 'red'}
            fitted
          />
          {companyName || 'Add Company'}
        </Header>
        <Divider inverted />
        <CompanyInput companyName={companyName} />
        <GroupInput data={company} />
        <GroupList groups={groups} />
        <Divider />
      </div>
    )
  }
}
