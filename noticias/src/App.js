import React from 'react';
import './Styles/Principales/App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";



// import InsForm from './App/Forms/insForm.jsx';
import Home from './Pages/Home.jsx'

function App() {

  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>


    </div>
  );
}

export default App;
