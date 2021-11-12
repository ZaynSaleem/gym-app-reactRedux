import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PrivateRoute from "../../PrivateRoute";
import SignIn from "../../pages/Auth/sign-in";
import SignUp from "../../pages/Auth/sign-up";
import Index from "../../pages/Main";
import Home from "../../pages/Main/home";
import Timer from "../../pages/Timer/timer";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        {/* <PrivateRoute path="/sign-in" component={SignIn} /> */}
        <PrivateRoute path="/exercise" component={Timer} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
