import React from 'react';
import './Styles/Principales/App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";



// import InsForm from './App/Forms/insForm.jsx';
import Home from './Pages/Home.jsx';
import Principal from './Pages/Principal.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import NewsPage from './Pages/News.jsx';

function App() {

  return (
    <div className="App">

        <Router>
          <Switch> 

            <Route  path ="/news/:id" component={NewsPage}/>
            <Route path="/" exact component={Home} />
            <Route path='/home' exact component={Principal} />
            <Route component={ErrorPage} />

          </Switch>
        </Router>


    </div>
  );
}

export default App;
