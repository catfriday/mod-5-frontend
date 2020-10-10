import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginSignUp from './LoginSignUp';
import Header from './Header';
import CreateProfileForm from './CreatProfileForm';
import GoalForm from './GoalForm';
import MyDash from './MyDash';
import Navbar from './Navbar';
import MyFoodLog from './MyFoodLog';


class App extends Component {
state = {
  currentUser: {},
  logedIn: false 
}

login = (e) => {
  e.preventDefault()

  fetch("http://localhost:3000/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value
            })
        })
        .then(res => res.json())
        .then(userInfo => {
            localStorage.token = userInfo.token
            localStorage.id = userInfo.id 
            localStorage.name = userInfo.name 
            this.setState({
              currentUser: userInfo.user,
              logedIn:true 
            })  
            // console.log(userInfo)
        })
}

createProfile = (e) => {
  e.preventDefault()
  // console.log(e.target.name.value)
  fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user:{

                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
                weight: e.target.weight.value,
                bank: e.target.bank.value,
                image: e.target.image.value,
                city: e.target.city.value
              }
            })
        })
        .then(res => res.json())
        .then(userInfo => {
            localStorage.token = userInfo.token
            localStorage.id = userInfo.id 
            localStorage.name = userInfo.name 
            this.setState({
              currentUser: {
                name: userInfo,
                logedIn:true 
              }
            })  
            console.log(userInfo)
        })
}

logout = () =>{
  localStorage.clear()
  console.log(localStorage)
}



render(){
  return (
    <BrowserRouter>
      <Header />
      {this.state.logedIn ? 
          <Fragment>
            <button onClick={this.logout}>Logout</button><br></br><br></br> 
          </Fragment>
          
          : null }

      <Navbar />

      <Switch>
        <Route path='/home' render={(routerProps) =>
           <LoginSignUp {...routerProps} 
              login={this.login} 
              currentUser={this.state.currentUser}/>} />

        <Route path='/create_profile' render={(routerProps) => 
            <CreateProfileForm {...routerProps} createProfile={this.createProfile}/>} />

        <Route path='/goals_form' render={(routerProps) =>
          <GoalForm {...routerProps} />} /> 

        <Route path='/my_dash' render={(routerProps) =>
          <MyDash {...routerProps} currentUser={this.state.currentUser}/> }/>
        
        <Route path='/my_food_log' render={(routerProps) =>
          <MyFoodLog {...routerProps} currentUser={this.state.currentUser}/>} />
       

      </Switch>
    </BrowserRouter>
  );
   }
}

export default App;
