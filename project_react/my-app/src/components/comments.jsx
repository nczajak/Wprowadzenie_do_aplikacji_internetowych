import Comment from "./comment";
import {useEffect} from "react";

const Comments =({comments,user,refreshComments})=>{

    useEffect(()=>{

    },[comments])

    return(
        <>
            <h3>Opinions: </h3>
            {(comments.length===0) && (
                <div>there is no opinions yet</div>
            )}
            {(comments.length>0)&& (
                <div>
                    {comments.map((comment, id) => (
                        <div key={id}>
                            <Comment comment={comment} user={user} refreshComments={refreshComments}/>
                        </div>
                    ))}

                </div>
            )}

        </>
    )

}

export default Comments;