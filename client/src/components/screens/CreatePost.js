import React from 'react'
import {useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'


const CreatePost=()=>{
    const [body,setBody]=useState('')
    const [image,setImage]=useState('')
    const [url,setUrl]=useState('')
    const history=useHistory()

    useEffect(()=>{
        if(url)
        {
            
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt"),
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    body,
                    photo:url
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error)
                {
                    M.toast({html:data.error,displayLength:1000})
                }
                else{
                    M.toast({html:"Posted successfully",displayLength:1000})
                    history.push('/home')
                }
            })
        }
    },[url]);
    const posdata=(e)=>{
        e.preventDefault();
        if(image && body)
        {
            postdata()
        }
        else{
            M.toast({html:"Please select image and enter caption",displayLength:1500})
        }
    }

    const postdata=()=>{
        M.toast({html:"Uploading your post...",displayLength:1000})
        const filedata=new FormData()
        filedata.append("file",image)
        filedata.append("upload_preset","insta-clone")
        filedata.append("cloud_name","dkmxj6hie")
        fetch("	https://api.cloudinary.com/v1_1/dkmxj6hie/image/upload",{
            method:"post",
            body:filedata
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return(
        <div>
            <div style={{position:"relative"}} className="create-post-div">
                <div className="create-post">
                <div className="create-post-title"><h4>Create Post</h4></div>
                    {(()=>{if(image){
                        const imgsrc=URL.createObjectURL(image)
                            return(<img className="create-image" alt={"Loading "} src={imgsrc}></img>
                            )
                    }})()}
                    {(()=>{if(body){
                            return(<h6 style={{marginBottom:"10px",marginTop:"0",textAlign:"center"}}>{body}</h6>
                            )
                    }})()}
                    <form style={{justifyContent:"center",alignItems:"center",display:"grid",alignContent:"center"}}>
                        <div class="file-field input-fieeld">
                            <div class="btn but-hover">
                                <span>Upload Image</span>
                                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>  
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" placeholder="Upload file"/>
                            </div>
                        </div>
                        <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Caption"></input>
                        <div className="create-button">
                            <button type="submit" className="btn but btn-small pink lighten-1"  onClick={(e)=>posdata(e)} >Post</button>
                            <button type="submit" className="btn but btn-small pink lighten-1" onClick={(e)=>history.push('/home')} >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost