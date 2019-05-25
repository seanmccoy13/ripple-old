import React from 'react'
import { Switch, Route } from 'react-router-dom'
import StaffLogin from './app/staff/components/login/StaffLogin'
import SurveyRoutes from './app/staff/components/survey/SurveyRoutes'
import FirstTimeLogin from './app/staff/components/login/FirstTimeLogin'
import ResultsPage from './app/results/ResultsPage'
import { WrappedRoute } from './app/staff/components/WrappedRoute'
import { WrappedAuthRoute } from './app/results/WrappedAuthRoute'
import Login from './app/common/login'
import { AdminAuthWrapper } from './app/admin/AdminAuthWrapper'
import AdminDashboard from './app/admin/AdminDashboard'
const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/ripple" component={Login} />
    <Route path="/id/:id" render={props => <StaffLogin {...props} />} />
    <WrappedRoute path="/survey" component={SurveyRoutes} />
    <WrappedRoute path="/firstTime" component={FirstTimeLogin} />
    <WrappedAuthRoute path="/results" component={ResultsPage} />
    <AdminAuthWrapper path="/admin-dashboard" component={AdminDashboard} />
  </Switch>
)

export default Routes
