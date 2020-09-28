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
import UpdateNews from './Pages/updateNews.jsx';
import NewWriter from './Pages/WriteAnew.jsx';
import UserInfo from './Pages/UserInfo.jsx';

function App() {
  
  return (
    <div className="App" id="App">

      <Router>
        <Switch>
          <Route path="/user/info/" component={UserInfo} />
          <Route path="/update/:id" component={UpdateNews} />
          <Route path="/news/:id" component={NewsPage} />
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={NewWriter} />
          <Route path='/home' exact component={Principal} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>


    </div>
  );
}

export default App;

