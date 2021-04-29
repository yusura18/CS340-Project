import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import sake from './pages/sake';
import company from './pages/company';
import review from './pages/review';
import reviewer from './pages/reviewer';
import 'bootstrap/dist/css/bootstrap.min.css';


// Need to render components (form, tables, search field) for each page
function App() {
  return (

    <div className="App">

      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={sake} />
          <Route exact path='/sake' component={sake} />
          <Route exact path='/company' component={company} />
          <Route exact path='/review' component={review} />
          <Route exact path='/reviewer' component={reviewer} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
