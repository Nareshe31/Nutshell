import React,{Suspense,lazy} from 'react'
import LoadHeader from './atom/LoadHeader'
import LoadImage from './atom/LoadImage'
const PostHeader=lazy(()=>import('./PostHeader'))
const PostImage=lazy(()=>import('./PostImage'))
const PostComment=lazy(()=>import('./PostComment'))

const Post=({item,index,likepost,unlikepost,data,deletecomment,makecomment,deletepost})=>{

    return(
        <div className="post-layout">
            <div >
                <Suspense fallback={<LoadHeader/>}>
                    <PostHeader item={item} index={index} deletepost={deletepost}/>
                </Suspense>
                <Suspense fallback={<LoadImage/>}>
                    <PostImage item={item} data={data} likepost={likepost} unlikepost={unlikepost}/>
                </Suspense>
                <Suspense fallback={<div></div>}>
                    <PostComment item={item} deletecomment={deletecomment} makecomment={makecomment}/>
                </Suspense>
            </div>
        </div>
        
    )
}

export default Post;