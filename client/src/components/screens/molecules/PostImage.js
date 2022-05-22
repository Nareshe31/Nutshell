import React,{useContext} from 'react'
import {UserContext} from '../../../App'
const PostImage=({item,data,unlikepost,likepost})=>{
    const {state}=useContext(UserContext)

    return(
        <div>
            <div>
                <img onDoubleClick={()=>{item.likes.includes(state._id)?unlikepost(item._id):likepost(item._id)}} alt={"No photo for "+item._id} className="all-post-image" src={item.photo}/>
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
        </div>
    )
}

export default PostImage; 