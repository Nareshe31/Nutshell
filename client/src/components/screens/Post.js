import React, { useEffect,useState,Suspense,lazy } from 'react'
import {useParams,Link} from 'react-router-dom'
import './Home.css'
import LoadingPage from './LoadingPage'
import LoadHeader from './molecules/atom/LoadHeader'
import LoadImage from './molecules/atom/LoadImage'
import M from 'materialize-css';

const Post=lazy(()=>import('./molecules/Post'))

const Posts=()=>{
    const {id}=useParams()
    const [item,setData]=useState(null)
    const [user,setUser]=useState()
    const [load,setLoad]=useState(false)
    const [log,setLog]=useState(false)
    useEffect(()=>{
        let u=JSON.parse(localStorage.getItem("user"))
        if(u){
          setUser(u)
          setLog(true)
          var a = parseInt(id,24);
          console.log(a)
          console.log(a.toString(16))
          if(String(id).length==24){
            fetch(`/post/${id}`,{
                headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            }).then(post=>post.json())
            .then(result=>{
                setData(result.posts)
                setLoad(true)
            })
            .catch(err=>{
              setLoad(true)
            })
          }else{
            setLoad(true)
          }
          
        }
        else{

        }
        
    },[item,log,load])

    const makecomment=(text,postId)=>{
        fetch("/comment",{
            method:"put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                text:text,
                postId:postId
            })
        }).then(res=>res.json())
        .then(result=>{
          console.log(result)
            const newData=result
            setData(newData)
        }).catch(err=>{
          console.log(err)
        })
      }

      const deletepost=(postid)=>{
        fetch('/deletepost/'+postid,{
          method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
          const newData=result
          setData(newData)
          M.toast({html:result.message,displayLength:1500,classes:'toast'})
        })
      }
      const deletecomment=(commentId,postId)=>{
        fetch('/deletecomment',{
          method:"put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              commentId,
              postId
          })
        }).then(res=>res.json())
        .then(result=>{
          const newData=result
          setData(newData)
          M.toast({html:"Comment deleted",displayLength:1500,classes:'toast'})
        })
      }   

      const likepost=(id)=>{
        fetch('/like',{
          method:"put",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            postId:id
          }) 
        })
        .then(res=>res.json())
        .then(result=>{
          const newData=result
          setData(newData)
        }).catch(err=>{
          console.log(err)
        })
      }
  
      const unlikepost=(id)=>{
        fetch('/unlike',{
          method:"put",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            postId:id
          }) 
        }).then(res=>res.json())
        .then(result=>{
          const newData=result
          setData(newData)
        }).catch(err=>{
          console.log(err)
        })
      }

      window.onclick = function(event) {
        if (!event.target.matches('.menu')) {
          var dropdowns = document.getElementsByClassName("dropdown-contents");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

      window.onscroll=function (){
        var dropdowns = document.getElementsByClassName("dropdown-contents");
        for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }

      const textStyle={
        display:'flex',
        width:'100%',
        height:'auto',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'3rem',
        fontSize:'1.3rem'
      }

    return(
        <div>{
          log?
            <div>
              {
                load?
                  <div>
                    {item?
                      <Suspense fallback={<div className="post-layout"><div><LoadHeader/><LoadImage/></div></div>}>
                        <Post item={item} likepost={likepost} unlikepost={unlikepost} deletecomment={deletecomment}  deletepost={deletepost} makecomment={makecomment}/>
                    </Suspense>:
                    <div style={textStyle}>
                      <span style={{marginRight:'8px'}}>No such post. Want to go home ?</span>
                      <Link to='/home'> click here</Link>
                  </div>
                }
                
              </div>
              :
              <LoadingPage/>
              }
          </div>
        :
        <div style={textStyle}>
          <div>
            <span style={{marginRight:'8px'}}>Login to view content </span>
            <Link to='/'> click here</Link>
          </div>
          
        </div>
        }
            
        </div>
    )
}

export default Posts;