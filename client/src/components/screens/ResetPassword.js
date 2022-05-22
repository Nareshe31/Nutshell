import React from 'react'
import {useHistory,useParams} from 'react-router-dom'
import {useState,useRef} from 'react'
import AppFooter from './AppFooter'
import M from 'materialize-css'



const ResetPassword=(()=>{

    const [password,setPassword]=useState('')
    const [confirmpassword,setconfirmPassword]=useState('')
    const pass=useRef()
    const pass2=useRef()
    const passtext=useRef()
    const history=useHistory()
    const {token}=useParams()
    const postdata=(e)=>{
        e.preventDefault();
        if(password && confirmpassword && (password===confirmpassword))
        {
            fetch("/new-password",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    password,
                    token
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error)
                {
                    M.toast({html:data.error,displayLength:1500})
                }
                else{
                    M.toast({html:data.message,displayLength:1500})
                    history.push('/')
                }
            })
        }
        else{
            if( !password || !confirmpassword)
            {
                M.toast({html:"Please fill both fields",displayLength:1000})
            }
            else
            {
                M.toast({html:"Both passwords are not same",displayLength:1000})
            }
        }
    }
    return(
        <div>
        <div className="sign-card"> 
            <div className="card medium mycard">
            <div className="card-content input-field">
                <h3 className="card-title">Reset Password</h3>
                <form onSubmit={(e)=>postdata(e)}>
                    <input required ref={pass}  type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/><br/><br/>
                    <input required ref={pass2} type="password"  value={confirmpassword} onChange={(e)=>setconfirmPassword(e.target.value)} placeholder="Confirm password"/>
                    <div className="checkbox">
                        <input type="checkbox" onClick={()=>{
                            if(pass.current.type==="password")
                            {
                                pass.current.type="text"
                                pass2.current.type="text"
                                passtext.current.innerHTML="Hide password"
                            }
                            else{
                                pass.current.type="password"
                                pass2.current.type="password"
                                passtext.current.innerHTML="Show password"
                            }
                        }}/> <p ref={passtext}>Show password</p>
                    </div><br/><br/>
                    <button type="submit" className="but btn-small pink lighten-1">Submit</button><br/><br/>
                </form>
            </div>  
            </div>
        </div>
        <AppFooter/>
        </div>
    )
})
export default ResetPassword;