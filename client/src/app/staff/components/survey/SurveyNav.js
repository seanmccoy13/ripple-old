import React from 'react'
import { Query } from 'react-apollo'
import { Menu, Icon } from 'semantic-ui-react'
import { GET_RESULT_LOCAL } from '../../../../graphql/local/queries'
import { StyledSurveyLink } from './style'

const SurveyNav = ({ pathname }) => {
  return (
    <Query query={GET_RESULT_LOCAL}>
      {
        ({ data: { result } }) => {
          if (pathname === '/survey/confirm' || pathname === '/survey') {
            return null
          }
          if (pathname === '/survey/intro2') {
            return (
              <Menu fluid widths={2}>
                <Menu.Item disabled>
                </Menu.Item>
                <Menu.Item>
                  <StyledSurveyLink to="/survey/page/1">
                    Next
                  </StyledSurveyLink>
                </Menu.Item>
              </Menu>
            )
          }
          const id = pathname[pathname.length - 1]
          const show = result[`p${id}`] > 0
          const page = Number(id)

          if (page === 1 && show) {
            return (
              <Menu fluid widths={2}>
                <Menu.Item disabled>
                </Menu.Item>
                <Menu.Item>
                  <StyledSurveyLink to={`/survey/page/${page + 1}`}>
                    Next
                  </StyledSurveyLink>
                </Menu.Item>
              </Menu>
            )
          }
          if (page === 1 && !show) {
            return (
              <Menu fluid widths={2}>
                <Menu.Item disabled>
                </Menu.Item>
                <Menu.Item disabled>
                </Menu.Item>
              </Menu>
            )
          }
          if (!show) {
            return (
              <Menu fluid widths={2}>
                <Menu.Item>
                  <StyledSurveyLink to={`/survey/page/${page - 1}`}>
                    Back
                  </StyledSurveyLink>
                </Menu.Item>
                <Menu.Item disabled>
                </Menu.Item>
              </Menu>
            )
          }
          if (page === 6) {
            return (
              <Menu fluid widths={2}>
                <Menu.Item>
                  <StyledSurveyLink to={`/survey/page/${page - 1}`}>
                    Back
                  </StyledSurveyLink>
                </Menu.Item>
                <Menu.Item>
                  <StyledSurveyLink to="/survey/confirm">
                    <Icon color='teal' name="trophy" /> Next
                  </StyledSurveyLink>
                </Menu.Item>
              </Menu>
            )
          }
          return (
            <Menu fluid widths={2}>
              <Menu.Item>
                <StyledSurveyLink to={`/survey/page/${page - 1}`}>
                  Back
                </StyledSurveyLink>
              </Menu.Item>
              <Menu.Item>
                <StyledSurveyLink to={`/survey/page/${page + 1}`}>
                  Next
                </StyledSurveyLink>
              </Menu.Item>
            </Menu>
          )
        }
      }
    </Query>
  )
}

export default SurveyNav
