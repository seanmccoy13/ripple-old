import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import { Switch } from 'react-router-dom'
import { Grid, Segment, Breadcrumb } from 'semantic-ui-react'
import { StyledBreadcrumb, StyledMenu, StyledMenuInner, StyledMT } from './style'
import SubmitSurvey from './SubmitSurvey'
import IntroPage1 from '../intro/IntroPage1'
import IntroPage2 from '../intro/IntroPage2'
import Survey from './Survey'
import SurveyNav from './SurveyNav'
import { WrappedRoute } from '../WrappedRoute'


class SurveyRoutes extends Component {
  pushHistory = () => this.props.history.push('/survey')
  componentDidMount = () => this.props.setTimeout(this.pushHistory, 900000)

  render() {
    const { pathname } = this.props.location
    return (
      <StyledMT>
        <Grid container stackable>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment>
                <Switch>
                  <WrappedRoute exact path="/survey" component={IntroPage1} />
                  <WrappedRoute path="/survey/intro2" component={IntroPage2} />
                  <WrappedRoute path="/survey/page/:id" component={Survey} />
                  <WrappedRoute path="/survey/confirm" component={SubmitSurvey} />
                </Switch>
                <StyledMenu>
                  <StyledMenuInner>
                    <SurveyNav pathname={pathname} />
                  </StyledMenuInner>
                </StyledMenu>
                <StyledBreadcrumb>
                  <Breadcrumb size="large">
                    <Breadcrumb.Section style={pathname === '/survey/intro2' || '/survey' ? { color: 'darkred' } : { color: 'teal' }}>Start</Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section style={pathname === '/survey/page/1' ? { color: 'darkred' } : { color: 'teal' }}>1</Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section style={pathname === '/survey/page/2' ? { color: 'darkred' } : { color: 'teal' }}>2</Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section style={pathname === '/survey/page/3' ? { color: 'darkred' } : { color: 'teal' }}>3</Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section style={pathname === '/survey/page/4' ? { color: 'darkred' } : { color: 'teal' }}>4</Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section style={pathname === '/survey/page/5' ? { color: 'darkred' } : { color: 'teal' }}>5</Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section style={pathname === '/survey/page/6' ? { color: 'darkred' } : { color: 'teal' }}>6</Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section style={pathname === '/survey/confirm' ? { color: 'darkred' } : { color: 'teal' }}>Finish</Breadcrumb.Section>
                  </Breadcrumb>
                </StyledBreadcrumb>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </StyledMT>
    )
  }
}

export default ReactTimeout(SurveyRoutes)
