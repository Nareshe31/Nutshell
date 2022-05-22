import React,{ useState ,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import { useHistory} from 'react-router-dom';
import M from 'materialize-css';

const UserEdit=(()=>{
    const {state,dispatch}=useContext(UserContext)
    const [profileimage,setProfileimage]=useState('')
    const [url,setUrl]=useState('')
    const [name,setName]=useState('')
    const [bio,setBio]=useState('')
    const [email,setEmail]=useState('')
    const [image,setImage] = useState(null)
    const history=useHistory()
    const [uploading,setUploading]=useState(false)

    useEffect(()=>{
      setProfileimage(state.profilePic)
      setName(state.name)
      setBio(state.bio)
      setEmail(state.email)
    },[])
    
    const update=(imgurl)=>{
      fetch('/updateprofile',{
        method:"put",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          name,
          bio,
          email,
          profilePic:imgurl
        }) 
      })
      .then(res=>res.json())
      .then(result=>{
          if(result.error)
          {
            M.toast({html:"Error Occurred",displayLength:1500})
          }
          else{
            localStorage.setItem("user",JSON.stringify(result.result))
            dispatch({type:"UPDATEPIC",payload:{name:result.result.name,email:result.result.email,bio:result.result.bio,profilePic:result.result.profilePic}})
            M.toast({html:"Profile Updated",displayLength:1500})
            history.push('/profile')
            
          }
      }).catch(err=>{
        console.log(err)
      })
    }

    const posdata=()=>{
        if(profileimage!=state.profilePic){
          const filedata=new FormData()
          filedata.append("file",image)
          filedata.append("upload_preset","insta-clone")
          filedata.append("cloud_name","dkmxj6hie")
          fetch("https://api.cloudinary.com/v1_1/dkmxj6hie/image/upload",{
              method:"post",
              body:filedata
          })
          .then(res=>res.json())
          .then(data=>{
              setUrl(data.secure_url)
              update(data.secure_url)
          })
          .catch(err=>{
            M.toast({html:"Something went wrong!",displayLength:1500})
          })
        }
        else{
          update(profileimage)
        }
        
    }
  //   const updatePhoto = (file)=>{
  //     setImage(file)
  //     console.log(file)
  //     updateProfile(file)
      
  // }

  // const image = document.querySelector('#fileupload');
  // image.addEventListener('change', (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', "insta-clone");

  //   fetch("https://api.cloudinary.com/v1_1/dkmxj6hie/image/upload", {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then(response => response.json())
  //     .then((data) => {
  //       if (data.secure_url !== '') {
  //         const uploadedFileUrl = data.secure_url;
  //         console.log(uploadedFileUrl)
  //         localStorage.setItem('passportUrl', uploadedFileUrl);
  //       }
  //     })
  //     .catch(err => console.error(err));
  // });
    return(
        <div className="edit-userprofile">
        <form onSubmit={(e)=>{
          e.preventDefault()
          posdata()}}>
          <label for="#pic">Profile Pic</label>
          <img src={profileimage} alt="Picture uploading"  className="profile-photo"></img><br/><br/>
          <input type="file" onChange={(e)=>{
            // setUploading(true)
            const urlnew=URL.createObjectURL(e.target.files[0])
            setProfileimage(urlnew)
            setImage(e.target.files[0])
            // const file = e.target.files[0];
            // const formData = new FormData();
            // formData.append('file', file);
            // formData.append('upload_preset', "insta-clone");

            // fetch("https://api.cloudinary.com/v1_1/dkmxj6hie/image/upload", {
            //   method: 'POST',
            //   body: formData,
            // })
            //   .then(response => response.json())
            //   .then((data) => {
            //     if (data.secure_url !== '') {
            //       const uploadedFileUrl = data.secure_url;
            //       console.log(uploadedFileUrl)
            //       setUrl(uploadedFileUrl)
            //       setProfileimage(uploadedFileUrl)
            //       setUploading(false)
            //       //localStorage.setItem('passportUrl', uploadedFileUrl);
            //     }
            //   })
            //   .catch(err => console.error(err));
          }}></input><br></br><br/>
          <label for="#name">Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name"></input>
          <label for="#email">Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" id="email"></input>
          <label for="#bio">Bio</label>
          <input value={bio} onChange={(e)=>setBio(e.target.value)} id="bio" type="text"></input>
          <button disabled={uploading?true:false} className="btn-small pink lighten-1" type="submit">Update</button>
        </form>
        </div>
    )
})

export default UserEdit;