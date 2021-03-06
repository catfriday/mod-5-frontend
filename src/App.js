import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginSignUp from './LoginSignUp';
import Header from './Header';
import CreateProfileForm from './CreatProfileForm';
import GoalForm from './GoalForm';
import MyDash from './MyDash';
import MyFoodLog from './MyFoodLog';
import NewNav from './NewNav';
import FoodSearchBar from './FoodSearchBar';
import FoodItem from './FoodItem';
import FoodList from './FoodList';
import MyProfile from './MyProfile';
import MyBetDash from './MyBetDash';
import BetForm from './BetForm';
import EditProfile from './EditProfile';

// REDUX PRACTICE RIGHT BELOW not necessary for app functionality
// let reducer = (state, action) => {
//   return state
// }
// const store = createStore(reducer) //reducer as argument

class App extends Component {
state = {
  currentUser: localStorage,
  loggedIn: localStorage.loggedIn,
  dailyLogs: [],
  dailyCalories: localStorage.calories,
  currentBet: [],
  monthly_progress: 0,
  todays_calories: 0
  
}

acceptGoal = (lbGoal) => {
    
  fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
          Authorization:  `Bearer ${localStorage.token}`
  },
      body: JSON.stringify({
          calories:lbGoal
  })
})
  .then(resp => resp.json())
  .then(user => {    
      console.log(user.calories)
      localStorage.calories = user.calories
      // this.setState({
      //   dailyCalories: user.calories
      // })
     
  })
}

setMonthlyProgress =(value) =>{
  this.setState({
    monthly_progress: value
  })
}

setCurrentBet = (bet) => {
 this.setState({
   currentBet: bet
 })
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
        
          console.log(userInfo)
            localStorage.token = userInfo.token
            localStorage.id = userInfo.id 
            localStorage.name = userInfo.name
            localStorage.email = userInfo.email
            localStorage.weight = userInfo.weight
            localStorage.bank = userInfo.bank
            localStorage.image = userInfo.image
            localStorage.city = userInfo.city
            localStorage.loggedIn = true
            localStorage.calories = userInfo.calories
             userInfo.daily_logs = userInfo.daily_logs 
             localStorage.monthly_progress = parseFloat(userInfo.monthly_progress)
             
            // localStorage.user = userInfo
            this.setState({
              currentUser: userInfo,
              loggedIn:localStorage.loggedIn,
              dailyLogs: userInfo.daily_logs,
              dailyCalories: localStorage.calories,
              currentBet: userInfo.bet,
              monthly_progress: userInfo.logged,
              todays_calories: userInfo.todays_calories 
            })  
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
                bank: 0,
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
          localStorage.email = userInfo.email
          localStorage.weight = userInfo.weight
          localStorage.bank = userInfo.bank
          localStorage.image = userInfo.image
          localStorage.city = userInfo.city
          localStorage.loggedIn = true 
          localStorage.calories = userInfo.calories
          userInfo.daily_logs = userInfo.daily_logs 
          localStorage.monthly_progress = userInfo.monthly_progress
        
          this.setState({
            currentUser: userInfo,
            currentUser: localStorage,
            loggedIn:true,
              dailyLogs: [],
              // dailyCalories: userInfo.calories,
              currentBet: [] 
          })  
          console.log(userInfo)
        })
}

logout = () =>{
  localStorage.clear()
  this.setState({
    loggedIn: false
  })
  window.location.reload()
  console.log(localStorage)
}

createlogs =() => {
console.log(this.state.currentUser)

fetch('http://localhost:3000/api/v1/create_thirty', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
                Authorization:  `Bearer ${localStorage.token}`
        },
            body: JSON.stringify({
                id: this.state.currentUser.id
        })
    })
        .then(resp => resp.json())
        .then(logs => {
           this.setState({
             dailyLogs:logs
             
           })
            console.log(logs)
        })
}

todayCalories =(value) => {
  this.setState({
    todays_calories: value
  })
}

handleChange = (e) =>{
  console.log(e.target)
  let name = e.target.name
  let value = e.target.value

  this.setState({
    currentUser: {...this.state.currentUser,
      [name]: value }
    })
}

patchUser = (e) => {
  e.preventDefault()
  let user = this.state.currentUser
  console.log(user)

  fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
          Authorization:  `Bearer ${localStorage.token}`
  },
      body: JSON.stringify({
        user: this.state.currentUser
  })
})
  .then(resp => resp.json())
  .then(user => {   
    this.setState({
      currentUser: user
    }) 
      console.log(user)
     
  })
}


render(){
  return (
    <BrowserRouter>
      <div className='app'>
      <Header />
      {/* this.state.currentUser.token */}
      {this.state.loggedIn ? 
          <Fragment>
            <NewNav 
              logout={this.logout} 
              bet={this.state.currentBet}/>
            <br></br><br></br>
          </Fragment>
          
           : null } 
      

      <Switch>
        <Route path='/home' render={(routerProps) =>
           <LoginSignUp  
              {...routerProps} 
              login={this.login} 
              currentUser={this.state.currentUser}/>} />
    
        <Route path='/create_profile' render={(routerProps) => 
            <CreateProfileForm 
                {...routerProps} 
                createProfile={this.createProfile}/>} />

        <Route path='/goals_form' render={(routerProps) =>
          <GoalForm 
              {...routerProps} 
              currentUser={this.state.currentUser} 
              acceptGoal={this.acceptGoal}/>} /> 

        <Route path='/my_dash' render={(routerProps) =>
          <MyDash 
              {...routerProps} 
              currentUser={this.state.currentUser} 
              dailyCalories={this.state.dailyCalories} 
              bet={this.state.currentBet} 
              monthly_progress={this.state.monthly_progress} 
              todays_calories={this.state.todays_calories} 
              setMonthlyProgress={this.setMonthlyProgress}/> }/>
        
        <Route exact path='/my_food_log' render={(routerProps) =>
          <MyFoodLog 
            {...routerProps} 
            currentUser={this.state.currentUser} 
            logsArray={this.state.dailyLogs} 
            setMonthlyProgress={this.setMonthlyProgress}
            todayCalories={this.todayCalories}/>} />
       
       <Route path='/my_profile' render={(routerProps) => 
        <MyProfile 
            {...routerProps} 
            currentUser={this.state.currentUser} 
            createlogs={this.createlogs}/>} />

        <Route path='/my_bet_dash' render={(routerProps) =>
          <MyBetDash 
              currentUser={this.state.currentUser} 
              bet={this.state.currentBet}/> }/>

          <Route path='/bet_form' render={(routerProps) =>
          <BetForm 
            currentUser={this.state.currentUser} 
            setCurrentBet={this.setCurrentBet} 
            acceptGoal={this.acceptGoal} 
            createLogs={this.createlogs}
            updateBet={this.updateBet}/>} />

          <Route path='/edit_profile'  render={(routerProps) =>
            <EditProfile 
              currentUser={this.state.currentUser}
              handleChange={this.handleChange}
              patchUser={this.patchUser} /> } />

        {/* <Route path='/my_food_log/:day_number' render={(routerProps) =>
          <FoodSearchBar {...routerProps} /> }/>

        <Route path='/food_item' render={(routerProps) =>
          <FoodItem {...routerProps}/> } />

         <Route path='/food_brand' render={(routerProps) =>
         <FoodList {...routerProps}/>}/>  */}

      </Switch>
      </div> 
    </BrowserRouter>
  );
   }
}

export default App;
