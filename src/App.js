import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/login-register/Login';
import Register from './component/login-register/Register';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Home from './component/home/Home';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import DetailClass from './component/detail-class/DetailClass';
import Profile from './component/user/Profile';
import InviteStudent from './component/detail-class/invite/InviteStudent';
import InviteTeacher from './component/detail-class/invite/InviteTeacher'


function App() {
  // localStorage.removeItem("token");
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  // const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
  }, [])

  return (
    <BrowserRouter>

      <div className="App">
        <>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Switch>
          <Route exact path="/"><Home /></Route>

            <Route exact path="/signin">
              <Login setLoggedIn={setLoggedIn}></Login>
            </Route>
         
            <Route exact path="/">
              {loggedIn ? null: <Redirect to="/signin" />}
              {/* <Login setLoggedIn={setLoggedIn}></Login> */}
            </Route>
            <Route exact path="/register" component={Register} />
            {!loggedIn ? <Redirect to="/signin" /> : null}
            <Route path="/classdetail/:id">
              <DetailClass />
            </Route>
            <Route path="/invite/1/:id">
              <InviteStudent />
            </Route>
            <Route path="/invite/0/:id">
              <InviteTeacher />
            </Route>
            <Route exact path="/profile" component={Profile} />

          </Switch>
          <Footer /></>


      </div>
    </BrowserRouter>
  );
}

export default App;
