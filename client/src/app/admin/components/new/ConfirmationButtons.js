import React from 'react'
import ConfirmCompanyButton from './components/ConfirmCompanyButton'
import ConfirmSurveyButton from './components/ConfirmSurveyButton'
import ConfirmUsersButton from './ConfirmUsersButton'

export default ({ company, groups, ms, ps, users }) => (
  <div>
    <ConfirmCompanyButton
      company={company}
      groups={groups}
    />
    <ConfirmSurveyButton
      company={company}
      ms={ms}
      ps={ps}
    />
    <ConfirmUsersButton
      company={company}
      users={users}
    />
  </div>
)

