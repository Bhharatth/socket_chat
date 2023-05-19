import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Messenger from './pages/messenger/Messenger';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        {/* * <Route path="/register" component={Register} /> */}
        <Route path="/messenger" component={Messenger} /> 
      </Switch>
    </Router>
  )
}

export default App