import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/login-register/Login';
import Register from './component/login-register/Register';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Home from './component/home/Home';
import { useEffect, useState } from 'react';
import DetailClass from './component/detail-class/DetailClass';
import Profile from './component/user/Profile';
import InviteStudent from './component/detail-class/InviteStudent';


function App() {
  // localStorage.removeItem("token");
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/"> <Login nameurl="/home"></Login></Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/home"><Home/></Route>
          <Route path="/classdetail/:id">
            <DetailClass />
          </Route>
          <Route path="/invite/1/:id">
            <InviteStudent />
          </Route>
          <Route exact path="/profile" component={Profile} />

        </Switch>
        <Footer loggedIn={loggedIn} />


      </div>
    </BrowserRouter>
  );
}

export default App;
