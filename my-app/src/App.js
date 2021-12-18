import React from 'react';
import './App.css';
import HeaderLinks from './components/navbar/HeaderLinks';
import Header from "components/Header/Header.js";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Sake from './pages/sake';
import Company from './pages/company';
import Review from './pages/review';
import Reviewer from './pages/reviewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/scss/material-kit-react.scss?v=1.10.0";

// Render components (form, tables, search field) for each page
function App() {

  return (

    <div className="App">

      <Router>
        <Header
          color="transparent"
          leftLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "dark"
          }}
        />
        <Switch>
          <Route exact path='/' component={Sake} />
          <Route exact path='/sake' component={Sake} />
          <Route exact path='/company' component={Company} />
          <Route exact path='/review' component={Review} />
          <Route exact path='/reviewer' component={Reviewer} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
