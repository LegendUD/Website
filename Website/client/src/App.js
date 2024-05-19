import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import StockPrices from './StockPrices';
import NewsFeed from './NewsFeed';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/stocks">
            <StockPrices />
          </Route>
          <Route path="/news">
            <NewsFeed />
          </Route>
          <Route path="/">
            <h1>Welcome to the Financial Website</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
