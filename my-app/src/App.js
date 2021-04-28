import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import sake from './pages/sake';
import company from './pages/company';
import review from './pages/review';
import reviewer from './pages/reviewer';


// Need to render components (form, tables, search field) for each page
function App() {
  return (

    <div className="App">

      <Router>
        <Navbar />
        <Switch>
          <Route path='/sake' component={sake} />
          <Route path='/company' component={company} />
          <Route path='/review' component={review} />
          <Route path='/reviewer' component={reviewer} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
