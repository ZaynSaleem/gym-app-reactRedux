import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SignIn from "../../pages/Auth/sign-in";
import SignUp from "../../pages/Auth/sign-up";
import Index from "../../pages/Main";
import Home from "../../pages/Main/home";
import Timer from "../../pages/Timer/timer";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/exercise">
          <Timer />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
