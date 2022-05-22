import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import {useState,useContext,useRef} from 'react'
import AppFooter from './AppFooter'
import M from 'materialize-css'
import {UserContext} from '../../App'



const Signin=(()=>{
    const {state,dispatch}=useContext(UserContext)

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const history=useHistory()
    const pass=useRef()
    const passtext=useRef()

    const postdata=(e)=>{
        e.preventDefault();
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                M.toast({html:data.error,displayLength:1500})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:data.message,displayLength:1500})
                history.push('/home')
            }
        })
    }
    return(
        <div>
        <div className="sign-card"> 
            <div className="card medium mycard">
            <div className="card-content input-field">
                <h3 className="card-title">Sign in</h3>
                <form onSubmit={e=>{postdata(e)}}>
                    <input type="email" required={true} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                    <input ref={pass} required={true} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                    <div className="checkbox">
                        <input type="checkbox" onClick={()=>{
                            if(pass.current.type=="password")
                            {
                                pass.current.type="text"
                                passtext.current.innerHTML="Hide password"
                            }
                            else{
                                pass.current.type="password"
                                passtext.current.innerHTML="Show password"
                            }
                        }}/> <p ref={passtext}>Show password</p>
                    </div><br/><br/>
                    <button type="submit" className="but btn-small pink lighten-1">Sign in</button><br/><br/>
                </form>
                <Link to='/reset' className="link">Forgot password ?</Link><br/>
                <h6 className="detail">Don't have an account ?</h6><Link to='/signup' className="link">Sign up</Link>
            </div>  
            </div>
        </div>
        <AppFooter/>
        </div>
    )
})
export default Signin;