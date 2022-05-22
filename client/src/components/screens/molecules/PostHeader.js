import React,{useContext} from 'react'
import {UserContext} from '../../../App'
import { Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const PostHeader=({item,index,deletepost})=>{
    const {state}=useContext(UserContext)
    const history=useHistory()
    const headerStyle={
        color:'black',
        display:'flex',
        alignItems:'center'
    }

    const copyLink=()=>{
        let textToCopy='https://nutshell-media.herokuapp.com/post/'+item._id
        // let textToCopy='http://localhost:3000/post/'+item._id
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard api method'
            navigator.clipboard.writeText(textToCopy)
        } else {
            // text area method
            let textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            // make the textarea out of viewport
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy')
        }
        M.toast({html:'Link copied',displayLength:1500,classes:'toast'})
    }
    return(
        <div className="post">
            <div className="profile">
                <Link to={item.postedby._id===state._id?'/profile':'/othersprofile/'+item.postedby._id} style={headerStyle}><img src={item.postedby.profilePic} alt="Profile pic"/><p className="profile-name">{item.postedby.name}</p></Link>
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
                        
                        {(()=>{if(item.postedby._id===state._id){
                            return(
                            <li>
                                <a onClick={()=>deletepost(item._id)}>delete</a>
                            </li>
                            )
                        }})()}
                        <li onClick={copyLink}><a>copy link</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostHeader; 