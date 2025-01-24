//dodawanie do bazy opini
import React, {useEffect, useState} from "react";

const CommentForms = ({userid, productid,isVisible, refreshComments})=>{


    const [body,setBody]=useState("");
    const [rating,setRating]=useState("");
    const [day,setDay]=useState("");
    const [month,setMonth]=useState("");
    const [year,setYear]=useState("");
    const [guard,setGuard]=useState(true)


    useEffect(()=>{
        const today = new Date();
        setDay(today.getDate());
        setMonth(today.getMonth()+1);
        setYear(today.getFullYear());
    },[])

    useEffect(()=>{

    },[guard])

    const correctComment = async ()=>{

        if (!parseFloat(rating) || parseFloat(rating) < 1 || parseFloat(rating) > 5) {
            alert("Rating should be a number between 1 and 5");
        }
        else{
            try {
                const response = await fetch('http://localhost:4000/api/comments',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userid,productid,data: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,body,rating})
                });

                alert("Commented successfully!");
                setGuard(false);
                refreshComments();

            }catch (err) {
                console.error('Error:', err);
            }
        }

    }

    return(
        <>
            {(isVisible && guard) && (
                <>
                    <h3>Add an opinion</h3>
                    <div>
                        <p>Comment</p>
                        <textarea value={body} onChange={(e) => {
                            setBody(e.target.value);
                        }}/>
                        <input type="number" value={rating} onChange={(e) => {
                            setRating(e.target.value);
                        }}/>
                        <button onClick={correctComment}>Add an opinion</button>
                    </div>
                </>
            )}

        </>
    )
}
export default CommentForms;