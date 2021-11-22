import { BrowserRouter, Switch, Route} from 'react-router-dom';

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


function App() {
  // localStorage.removeItem("token");
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(localStorage.getItem("user"))


  return (
    <BrowserRouter>
      <div className="App">
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/classdetail/:id">
            <DetailClass />
          </Route>
          <Route exact path="/profile" component={Profile} />

        </Switch>
        <Footer loggedIn={loggedIn}/>


      </div>
    </BrowserRouter>
  );
}

export default App;
