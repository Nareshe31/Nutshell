import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/HomeNew';
import Signin from './components/screens/Signin'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import UserEdit from './components/screens/UserEdit'
import CreatePost from './components/screens/CreatePost' 
import ForgetPassword from './components/screens/ForgetPassword'
import ResetPassword from './components/screens/ResetPassword'
import Post from './components/screens/Post'
import Error from './components/screens/Error'
import LoadHeader from './components/screens/molecules/atom/LoadHeader'
import $ from 'jquery'
import {useState,useReducer,useEffect,createContext,useContext} from 'react'
import {initialstate,reducer} from './components/reducers/userReducer'
import OthersProfile from './components/screens/OthersProfile'

export const UserContext=new createContext()

  const Routing=()=>{
    const history=useHistory()
    const {state,dispatch}=useContext(UserContext)
    
    useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("user"))
      if(user)
      {
        dispatch({type:"USER",payload:user})
        if(history.location.pathname=='/' || history.location.pathname.startsWith('/signup'))
        {
          history.push('/home')
          return
        }
      }
      else
      {
        if(history.location.pathname.startsWith('/home') || history.location.pathname.startsWith('/profile') || history.location.pathname.startsWith('/create') || history.location.pathname.startsWith('/othersprofile') || history.location.pathname.startsWith('/edituser'))
        {
          history.push('/')
          return
        }
       
      }
    },[]);

    return(
      <Switch>
        <Route path="/home"><Home/></Route>
        <Route exact path="/"><Signin/></Route>
        <Route path="/signup"><Signup/></Route>
        <Route path="/profile"><Profile/></Route>
        <Route path="/create"><CreatePost/></Route>
        <Route path="/othersprofile/:userId"><OthersProfile/></Route>
        <Route path="/edituser"><UserEdit/></Route>
        <Route exact path="/reset"><ForgetPassword/></Route>
        <Route exact path="/reset-password/:token"><ResetPassword/></Route>
        <Route path='/post/:id'><Post/></Route>
        {/*<Route exact path="/load"><LoadHeader/></Route>*/}
        <Route exact path="*"><Error/></Route>
      </Switch>
    )
  }

function App() {
  const [valb,setValb]=useState();
  $(window).scroll(function() {
    const val_now=$(window).scrollTop();
    if (val_now<valb ){  
      $('#navi').addClass("navbar-fixed");
    }
    else {
      $('#navi').removeClass("navbar-fixed");
    }
    setValb(val_now)
  });
  
  const [state,dispatch]=useReducer(reducer,initialstate)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter> 
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
