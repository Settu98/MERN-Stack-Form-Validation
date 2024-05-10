import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import EmployeeEditForm from './EmployeeEditForm';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/employees' component={EmployeeList} />
        <Route exact path='/employees/new' component={EmployeeForm} />
        <Route exact path='/employees/edit/:id' component={EmployeeEditForm} />
      </Switch>
    </Router>
  );
};

export default App;
