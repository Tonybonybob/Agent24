import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';


import Page404 from './pages/404';
import SigninPage from './pages/auth/SigninPage';
import RecoveryPage from './pages/auth/RecoveryPage';
import RegisterPage from './pages/auth/pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ProfileEditPage from './pages/ProfileEditPage';
import ProfileCreatePage from './pages/ProfileCreatePage';
import AgencyPage from './pages/AgencyPage';
import DatabasePage from './pages/DatabasePage';
import DealsPage from './pages/DealsPage';
import ExclusivePage from './pages/ExclusivePage';
import RegistryPage from './pages/RegistryPage';
import ReportsPage from './pages/ReportsPage';
import TasksPage from './pages/TasksPage';
import ClientPage from './pages/ClientPage';
import ClientEdit from './pages/ClientEditPage';
import AgentProfile from './pages/AgentProfilePage';
import AgentEdit from './pages/AgentEditPage';
import ResumesPage from './pages/ResumesPage';
import InvestorsPage from './pages/InvestorsPage';

const Root = ({ history }) => (
  <Router>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/investors" component={InvestorsPage} />
        <Route exact path="/cv" component={ResumesPage} />
        <Route path="/(signin|login)" component={SigninPage} />
        <Route path="/(signup|register)" component={RegisterPage} />
        <Route path="/recovery" component={RecoveryPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route path="/client/:id" component={ClientPage} />
        <Route path="/client-edit/:id" component={ClientEdit} />
        <Route path="/agent/:id" component={AgentProfile} />
        <Route path="/agent-edit/:id" component={AgentEdit} />
        <Route path="/profile-edit" component={ProfileEditPage} />
        <Route path="/profile-create" component={ProfileCreatePage} />
        <Route path="/agency/:id" component={AgencyPage} />
        <Route path="/database" component={DatabasePage} />
        <Route path="/deals" component={DealsPage} />
        <Route path="/exclusive" component={ExclusivePage} />
        <Route path="/registry" component={RegistryPage} />
        <Route path="/reports" component={ReportsPage} />
        <Route path="/tasks" component={TasksPage} />
        <Route path="*" component={Page404} />
      </Switch>
    </ConnectedRouter>
  </Router>
);

Root.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Root;
