import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/login-register/Login';
import Register from './component/login-register/Register';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Home from './component/home/Home';
import { useEffect, useState } from 'react';

function App() {

  // const [name, setName] = useState('');
  // useEffect(() => {
    // (
      // async () => {
      //   const response = await fetch('http://localhost:3000/users', {
      //     headers: { 'Content-Type': 'application/json' },
      //     credentials: 'include',
      //   });

      //   const content = await response.json();

      //   setName(content.name);

  //     fetch('http://localhost:3000/users', {
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //     })
  //       .then(response => { const content = response.json() })
  //       .catch(error => console.log('error', error)),
  //     setName(content.name))
  // }

  // )();



  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
        </Switch>
        <Footer />


      </div>
    </BrowserRouter>
  );
}

export default App;
