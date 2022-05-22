import React, { useState ,useEffect, useContext,Suspense,lazy} from 'react'
import { Link } from 'react-router-dom';
import {UserContext} from '../../App'
import M from 'materialize-css';
import options from 'materialize-css';
import './Home.css'
import LoadingPage from './LoadingPage';
import LoadHeader from './molecules/atom/LoadHeader'
import LoadImage from './molecules/atom/LoadImage'
const Post=lazy(()=>import('./molecules/Post'))
 
const HomeNew=(()=>{
    const [fav,setFav]=useState('favorite_border')
    const [favprev,setFavprev]=useState('favorite_border')
    const [data,setData]=useState([])
    const [load,setLoad]=useState(false)
    const {state,dispatch}=useContext(UserContext)

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);

    useEffect(()=>{
        fetch('/allpost',{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res.json())
        .then(result=>{
          setData(result.posts)
          setLoad(true)
        })
    },[])
    
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
            const newData=data.map(item=>{
              if(item._id==result._id)
              {
                return result
              }
              else{
                return item
              }
            })
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
          const newData=data.filter(item=>{
            return item._id!=result._id
          })
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
          const newData=data.filter(item=>{
            return item._id!=result._id
          })
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
          const newData=data.map(item=>{
            if(item._id==result._id)
            {
              return result
            }
            else{
              return item
            }
          })
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
          const newData=data.map(item=>{
            if(item._id==result._id)
            {
              return result
            }
            else{
              return item
            }
          })
          setData(newData)
        }).catch(err=>{
          console.log(err)
        })
      }
      
      // Close the dropdown menu if the user clicks outside of it
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

    return(
        <div>
        {load?
            <div className="allpost">
                {data.map((item,index)=>{
                    return(
                        <Suspense fallback={<div className="post-layout"><div><LoadHeader/><LoadImage/></div></div>}>
                            <Post item={item} data={data} likepost={likepost} unlikepost={unlikepost} deletecomment={deletecomment} index={index} key={index} deletepost={deletepost} makecomment={makecomment}/>
                        </Suspense>
                    )
                    
                })}
                <div class="fixed-action-btn">
                    <Link to="/create" class="btn-floating btn-large pink lighten-1" >
                        <i class="large material-icons">add</i>
                    </Link>
                </div>  
            </div>
            :
            <LoadingPage/>
        }  
        </div>
    )
})

export default HomeNew;