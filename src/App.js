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


function App() {
  // localStorage.removeItem("token");
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"))
  console.log(loggedIn)


  return (
    <BrowserRouter>
      <div className="App">
      
       <Header loggedIn={loggedIn}/>
    
        <Switch>
       
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/detail-class" component={DetailClass} />
        </Switch>
        <Footer />
        

      </div>
    </BrowserRouter>
  );
}

export default App;
