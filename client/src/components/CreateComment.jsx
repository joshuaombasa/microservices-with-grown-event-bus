import axios from "axios";
import React, { useState } from "react";

export default function CreateComment({ postId }) {

    const [content, setContent] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post(`http://localhost:4001/posts/${postId}/comment`, {content})
        setContent('')
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">New Comment</label>
                    <input
                        type="text"
                        value={content} onChange={e => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">submit</button>
            </form>
        </div>
    )
}