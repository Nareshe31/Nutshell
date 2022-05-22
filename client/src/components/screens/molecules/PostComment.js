import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import {UserContext} from '../../../App'

const PostComment=({item,deletecomment,makecomment})=>{
    const {state}=useContext(UserContext)
    return(
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
                            {(()=>{if(record.commentBy._id===state._id){
                            return(
                                <i class="small material-icons" style={{fontSize:"17px",position:"absolute",right:"25px",marginTop:"5px",cursor:"pointer"}} onClick={()=>deletecomment(record._id,item._id)}>delete</i>
                            )
                            }})()}
                        </div>
                    )})
                }
            </div>
        </div>
                    
    )
}

export default PostComment; 