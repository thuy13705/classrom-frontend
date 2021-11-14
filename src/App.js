import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/login-register/Login';
import Register from './component/login-register/Register';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import ClassDetail from './component/Classes/ClassDetail';
import Profile from './component/user/Profile';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/course/:id">
            <ClassDetail />
          </Route>
          <Route exact path="/profile" component={Profile} />

        </Switch>
        <Footer />


      </div>
    </BrowserRouter>
  );
}

export default App;
