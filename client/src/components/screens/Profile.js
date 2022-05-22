import React,{ useState ,useEffect,useContext,useRef} from 'react'
import {UserContext} from '../../App'
import { Link} from 'react-router-dom';
import M from 'materialize-css';
import options from 'materialize-css';
import LoadingPage from './LoadingPage'

const Profile=(()=>{

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        // var instances = M.Sidenav.init(elems, options);
      });

    const profileModal=useRef(null)

    const {state,dispatch}=useContext(UserContext)
    const [mypics,setPics]=useState([])
    const [load,setLoad]=useState(false)
    const [profileimage,setProfileimage]=useState('')
    const [url,setUrl]=useState('')

    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
            setProfileimage(result.profilePic)
            setLoad(true)
        })
    },[])
      
    return(
      <>
      {
      load?
        <div>
            <div className="profile-page">
                <div style={{display:"flex",justifyContent:"space-around",backgroundColor:"#f5f5f5",alignContent:"center"}} className="profile-div">
                    <div className="profile-div1">
                        <img style={{marginRight:"0.5rem"}} className="profile-photo" alt="profile pic" src={state.profilePic}/>
                    </div>
                    <div>
                        <h4>{state.name}</h4>
                        <h6>{state.bio}</h6>
                        <div style={{display:"flex",justifyContent:"space-around",width:"107%"}} class="post-followers">
                        <h6 style={{fontSize:"1.05rem"}}>{mypics.length} posts</h6>
                        <h6 style={{fontSize:"1.05rem"}}>{state.followers.length} followers</h6>
                        <h6 style={{fontSize:"1.05rem"}}>{state.following.length} following</h6>
                    </div>
                    </div>
                    <Link to="/edituser">
                        <button style={{marginTop:"25px"}} class="btn-small pink lighten-1 modal-trigger"><i class="small material-icons edit-profile">edit</i></button>
                    </Link>
                </div>

                <div className="all-posts" style={{borderTo0p:"1px solid black"}}>
                {
                    mypics.map((item,index)=>{
                        return(
                        <Link to={"/post/"+item._id}>
                        <div className="post-image">
                        {
                            // onClick={()=>{
                            //     document.getElementById('modal2'+index).classList.toggle('show')
                            // }}
                        }
                            <div className="post-hover" >
                                <div className="post-like-count">
                                    <i class="small material-icons favorite">favorite</i>
                                    <h6>{item.likes.length}</h6>
                                </div>
                            </div>
                            <img  className="item" src={item.photo} alt={item.body}></img>

                            <div id={"modal2"+index} className="profile-modal" ref={profileModal}>
                                 <div className="profile-modal-content">
                                     <img src={item.photo}></img>
                                 </div>
                                
                                <div className="profile-modal-footer">
                                    <button onClick={()=>{
                                        document.getElementById('modal2'+index).classList.toggle('show')
                                    }} className="modal-close btn-flat">Close</button>
                                </div>
                            </div>
                        </div>
                        </Link>
                        )
                    })
                }   
                </div>

                <div class="fixed-action-btn">
                    <Link to="/create" class="btn-floating btn-large pink lighten-1" >
                        <i class="large material-icons">add</i>
                    </Link>
                </div>
            
            </div>
        </div>
        :
            <LoadingPage/>
          }
              </>
    )
})
export default Profile;