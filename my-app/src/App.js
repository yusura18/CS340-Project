import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import sake from './pages/sake';
import company from './pages/company';



// Need to render components (form, tables, search field) for each page
function App() {
  return (

    <div className="App">

      <Router>
        <Navbar />
        <Switch>
        
          <Route path='/sake' component={sake} />
          <Route path='/company' component={company} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
