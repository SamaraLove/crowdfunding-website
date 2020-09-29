import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";

import "./App.css";

function App() {
  return (
    <Router>
      <div className={"App"}>
        <Nav />
        <Switch>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/users/:id/">
            <ProfilePage />
          </Route>
          <Route path="/projects/:id/">
            <ProjectPage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
