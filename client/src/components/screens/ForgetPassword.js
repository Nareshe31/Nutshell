import React from 'react'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import AppFooter from './AppFooter'
import M from 'materialize-css'




const ForgetPassword=(()=>{

    const [email,setEmail]=useState('')
    const history=useHistory()

    const postdata=(e)=>{
        e.preventDefault();
        fetch("/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                M.toast({html:data.error,displayLength:1500})
            }
            else{
                M.toast({html:data.message,displayLength:1000})
                history.push('/')
            }
        })
    }
    return(
        <div>
            <div className="sign-card"> 
                <div className="card medium mycard" style={{height:"auto"}}>
                    <div className="card-content input-field">
                        <h3 className="card-title">Forgot Password</h3>
                        <div className="reset-info">
                            <h6>To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</h6>
                        </div>
                        <form onSubmit={(e)=>postdata(e)} >
                            <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                            <br/><br/>
                            <button type="submit" className="but btn-small pink lighten-1">Reset Password</button><br/><br/>
                        </form>
                    </div>  
                </div>
            </div>
            
            <AppFooter/>
        </div>
    )
})
export default ForgetPassword;