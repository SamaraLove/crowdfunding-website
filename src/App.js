import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Error404 from "./components/Error404";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/Login";
// import CreatePledgePage from "./pages/CreatePledgePage";
import CreateProjectPage from "./pages/CreateProjectPage";
import CreateAccount from "./pages/CreateAccount";
import AllUsers from "./pages/AllUsersPage";
import EditProjectPage from "./pages/EditProjectPage";
import EditProfilePage from "./pages/EditProfilePage";
import DeleteProjectPage from "./pages/DeleteProjectPage";
import DeleteUserPage from "./pages/DeleteUserPage";
import AllPledgesPage from "./pages/AllPledgesPage";
// import DELETE from "./pages/DELETE";

import "./App.css";

function App() {
  return (
    <Router>
      <div className={"App"}>
        <Nav />
        <Switch>
          <Route path="/profile/:username/delete">
            <DeleteUserPage />
          </Route>
          <Route path="/projects/:id/delete1">
            <DeleteProjectPage />
          </Route>
          <Route path="/pledges">
            <AllPledgesPage />
          </Route>
          {/* <Route path="/pledges/:id/">
            <PledgePage />
          </Route> */}
          <Route path="/projects/:id/edit">
            <EditProjectPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/users">
            <AllUsers />
          </Route>
          <Route path="/createaccount">
            <CreateAccount />
          </Route>
          <Route path="/createproject">
            <CreateProjectPage />
          </Route>
          {/* <Route path="/projects/:id/">
            <CreatePledgePage />
          </Route> */}
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/profile/:username/edit">
            <EditProfilePage />
          </Route>
          <Route path="/profile/:username/">
            <ProfilePage />
          </Route>
          <Route path="/projects/:id/">
            <ProjectPage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route>
            <Route path="*" exact={true} component={Error404} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
