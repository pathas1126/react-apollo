import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id" component={Detail} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
