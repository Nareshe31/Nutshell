import React, { useState ,useEffect, useContext,Suspense,lazy} from 'react'
import { Link } from 'react-router-dom';
import {UserContext} from '../../App'
import M from 'materialize-css';
import options from 'materialize-css';
import LoadingPage from './LoadingPage'
import './Home.css'
const Load=lazy(()=>import('./Load'))
 
const Home=(()=>{
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
    },[data])

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
      <>
      {
        load?
        <div className="allpost">
            
            {data.map((item,index)=>{
              return(
                <div>
                  <div className="post-layout">
                    <div>
                      <div className="post">
                        <div className="profile">
                          <img src={item.postedby.profilePic} alt="Profile pic"/>
                          <Link to={item.postedby._id==state._id?'/profile':'/othersprofile/'+item.postedby._id} style={{color:"black"}}><p className="profile-name">{item.postedby.name}</p></Link>
                          <div class="dropdown-div">
                            <button 
                             class="dropdownbtn"><i onClick={()=>{
                              document.getElementById("mydropdown"+index).classList.toggle("show");
                              }} class="small menu material-icons">more_vert</i>
                            </button>
                            <div id={"mydropdown"+index} className="dropdown-contents">
                              <ul className="dropdown-list">
                                {(()=>{
                                  var url=item.photo;
                                  var b="/fl_attachment"
                                  var position=url.lastIndexOf('upload')+6;
                                  var out=[url.slice(0, position), b, url.slice(position)].join('');
                                  return(
                                    <li>
                                      <a href={out} onClick={()=>{
                                      }} download="imagenutshell.jpg">save</a>
                                    </li>
                                  )
                                })()}
                                
                                {(()=>{if(item.postedby._id==state._id){
                                  return(
                                    <li>
                                      <a onClick={()=>deletepost(item._id)}>delete</a>
                                    </li>
                                  )
                                }})()}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <img onDoubleClick={()=>{item.likes.includes(state._id)?unlikepost(item._id):likepost(item._id)}} alt="No photo" className="all-post-image" src={item.photo}/>
                      </div>
                        
                      
                      <div class="post-content">
                        <div className="post-content1">
                        {
                          item.likes.includes(state._id)?<i class="small material-icons pink-text favorite" onClick={()=>unlikepost(item._id)}>favorite</i>
                          :<i class="small material-icons pink-text favorite" onClick={()=>likepost(item._id)}>favorite_border</i>
                        }
                          
                          <h6>{item.likes.length} likes</h6>
                        </div>
                        <h6 className="post-content2">{item.body} </h6>
                      </div>
                      <div class="comments">
                        <form onSubmit={(e)=>{
                            e.preventDefault();
                            makecomment(e.target[0].value,item._id);
                            e.target[0].value='';
                        }}>
                          <input type="text" className="comment-input" placeholder="Add a comment"></input>
                          <button type="submit" className="btn-small but-post white pink-text"><i class="large material-icons">send</i></button>
                        </form>
                        <div className="comment-profile">
                        
                          {
                            item.comments.map(record=>{
                              return(
                                <div>
                                  <Link to={'/othersprofile/'+record.commentBy._id} style={{color:"black"}}><p style={{fontSize:"1.05rem",margin:"auto 3px",fontWeight:"bold"}}>{record.commentBy.name}</p></Link>
                                  <p class="comment-text" style={{fontSize:"1rem",display:"flex-inline",maxWidth:"380px",margin:"auto 4px"}}>{record.text}</p>
                                  {(()=>{if(record.commentBy._id==state._id){
                                    return(
                                      <i class="small material-icons" style={{fontSize:"17px",position:"absolute",right:"25px",marginTop:"5px",cursor:"pointer"}} onClick={()=>deletecomment(record._id,item._id)}>delete</i>
                                    )
                                  }})()}
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
            }
            <div class="fixed-action-btn">
              <Link to="/create" class="btn-floating btn-large pink lighten-1" >
                  <i class="large material-icons">add</i>
              </Link>
            </div>  
  
        </div>
        :
        <LoadingPage/>
          }
          </>
    )
})
export default Home;