import React, {useEffect, useState} from "react";
import comments from "./comments";

const Comment = ({comment,user,refreshComments})=>{

    const [users,setUsers]=useState([]);
    const [username,setUsername]=useState("");
    const [userID,setUserID]=useState(0);
    const [check,setCheck]=useState(false);
    const [deleted,setDeleted]=useState(true)
    const [newBody,setNewBody]=useState(comment.body);
    const [newRating,setNewRating]=useState(comment.rating);
    const [newDay,setNewDay]=useState("");
    const [newMonth,setNewMonth]=useState("");
    const [newYear,setNewYear]=useState("");
    const [edit,setEdit]=useState(false)


    const editComment = async () => {
        if (!parseFloat(newRating) || parseFloat(newRating) < 1 || parseFloat(newRating) > 5) {
            alert("Rating should be a number between 1 and 5");
            return;
        }
        console.log("productid: ",comment.productID)
        console.log("userid: ",comment.userID)
        console.log(newBody)

        try {
            const response = await fetch(`http://localhost:4000/api/comments/${comment.userID}/${comment.productID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newBody: newBody,
                    newRating: newRating,
                    newData: `${newYear}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`,
                }),
            });
            setEdit(false)
            if (response.ok) {
                alert("Comment updated successfully!");
                refreshComments();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(()=>{
        const today = new Date();
        setNewDay(today.getDate());
        setNewMonth(today.getMonth()+1);
        setNewYear(today.getFullYear());
    },[])

    useEffect(()=>{
        if(user!==-1){
            setUserID(user.id)
        }
    },[user])



    const showCheck= ()=>{
        setCheck(!check )
    }
    const showEdit = ()=>{
        setEdit(true)
    }


    useEffect(()=>{
        const fetchData = async () => {
            try {
                const usersResponse = await fetch('http://localhost:4000/api/users');
                const usersData = await usersResponse.json();
                setUsers(usersData.users);

                const matchingUser = usersData.users.find(user => user.id === comment.userID);
                if (matchingUser) {
                    setUsername(matchingUser.username);
                }
            } catch (error) {
                console.error('Błąd:', error);
            }
        };

        fetchData();
    },);

    const deleteOpinion = async ()=>{
        try{
            const response = await fetch(`http://localhost:4000/api/comments/${comment.userID}/${comment.productID}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            setDeleted(false)

        } catch (error) {
            console.error('Błąd podczas usuwania opinii:', error);
        }
    }

    return(
        <>
            {(deleted)&&(
                <>
                    <p>username: {username}</p>
                    <p>comment:{comment.body} </p>
                    <p>rating: {comment.rating}</p>
                    <p>date: {comment.data}</p>
                    {(userID===comment.userID || userID===1)&& (
                        <>
                            <button onClick={showCheck}>Delete</button>
                            <button onClick={showEdit}>Edit</button>
                            </>
                    )}
                    {(check)&&(
                        <div>
                            <p>Are you sure you want to delete this opinion?</p>
                            <button onClick={deleteOpinion}>delete</button>
                            <button onClick={showCheck}>cancel</button>
                        </div>
                    )}
                    {(edit)&&(
                        <>
                            <div>
                                <p>Comment</p>
                                <textarea value={newBody} onChange={(e) => {
                                    setNewBody(e.target.value);
                                }}/>
                                <input type="number" value={newRating} onChange={(e) => {
                                    setNewRating(e.target.value);
                                }}/>
                                <button onClick={editComment}>Edit an opinion</button>
                            </div>
                        </>
                    )}
                </>
            )}

        </>
    )
}
export default Comment;