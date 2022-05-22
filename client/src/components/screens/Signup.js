import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import {useState,useRef} from 'react'
import M from 'materialize-css';
import AppFooter from './AppFooter';


const Signup=(()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [failure,setFailure]=useState(false) 
    const [failcontent,setFailcontent]=useState()
    const pass=useRef()
    const passtext=useRef()
    const history=useHistory()

    const postdata=(e)=>{
        e.preventDefault();
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                setFailcontent(data.error)
                setFailure(true)
                M.toast({html:data.error,displayLength:1000})
            }
            else{
                M.toast({html:data.message,displayLength:1000})
                history.push('/signin')
            }
        })
    }

    // {(()=>{if(failure){
    //     return(<div class="alert alert-danger alert-dismissible fade in">
    //     <a href="#" class="close" onClick={()=>setFailure(false)} data-dismiss="alert" aria-label="close">&times;</a>
    //     <strong>{failcontent}</strong>
    //     </div>)
    // }})()}

    return(
        <div>
       
        <div className="sign-card">
            <div className="card medium mycard">
            <div className="card-content input-field">
                <h3 className="card-title">Sign up</h3>
                <form onSubmit={(e)=>postdata(e)}>
                    <input type="text" required={true} className="" minLength={5} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
                    <input type="email" required={true} className="" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                    <input ref={pass} type="password" required={true} minLength={8} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
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
                    <button type="submit" className="btn-small pink lighten-1 but" name="action">Sign up</button>
                </form>
                <h6 className="detail">Already have an account ?</h6><Link to='/' className="link">Sign in</Link>
            </div>  
            </div>
        </div>
        <AppFooter/>
        </div>
    )
})
export default Signup;