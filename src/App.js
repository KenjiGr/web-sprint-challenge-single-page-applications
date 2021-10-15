import React from "react";
import {Link, Route, Switch} from 'react-router-dom';
import Home from './components/Home'
import Form from "./components/Form";

const App = () => {
  return (
    <div className="header">
      <h1>Lambda Eats</h1>
      <p>Your favorite food, delivered while coding</p>
      <nav>
        <Link to="/"><button>Home</button></Link>
        <Link to="/pizza">
       <button className="order-pizza">Order</button>
        </Link>
      </nav>
      <Switch>
          <Route path="/pizza" component={Form} />
          <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};
export default App;
