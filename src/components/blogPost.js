import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { DateTime } from "luxon";

const BlogPost = () => {

    const { postId } = useParams();
    const [ post, setPost ] = useState([]);
    const [ comments, setComments ] = useState([]);
    const [ usernameField, setUsernameField ] = useState('');
    const [ commentField, setCommentField ] = useState('');
    
    //fetch single post using url param
    useEffect(() => {
        fetch(`https://qa7680-blog-api.onrender.com/api/posts/${postId}`, {mode: 'cors', method: 'GET'})
            .then(res => res.json())
            .then(data => setPost(data.post[0]));
    }, []);

    //fetch single post comments
    useEffect(() => {
        fetch(`https://qa7680-blog-api.onrender.com/api/posts/${postId}/comments`, {mode: 'cors', method: 'GET'})
            .then(res => res.json())
            .then(data => setComments(data.comments.map(comment => {
                return {...comment, time: DateTime.fromISO(comment.time).setLocale('en').toFormat('ff')}
            })));
    }, [comments]);

    function addComment(e){
        e.preventDefault();
        fetch(`https://qa7680-blog-api.onrender.com/api/posts/${postId}/comments`,
        {mode:'cors', method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            comment: commentField,
            username: usernameField
        })})
            .then(res => res.json())
            .then(data => {
                console.log('Success: ', data)
        });
        setUsernameField('');
        setCommentField('');
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };
    

    return(
        <div style={{ display:'flex', alignItems: 'center', flexDirection: 'column', padding: '2rem', gap: '5rem' }}>
            <div style={{ display:'flex', alignItems: 'center', flexDirection: 'column', gap: '0.5rem', width: '50%'}}>
                <h2 style={{ marginBottom: '1rem' }} className="fw-bolder">{post.title}</h2>
                <p style={{ padding: '2rem', backgroundColor: 'lightgrey', color: 'black' }} className="card fw-normal">{post.blogText}</p>
                <p style={{ alignSelf: 'flex-start'}} className="fst-italic">- Published By Admin</p>
            </div>
            <div style={{ display:'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                <h4>Comments: </h4>
                {comments.length < 1 ? 'No Comments Yet' : 
                comments.map((comment) => {
                    return(
                    <div>
                        <div class="card" style={{width: '40vw'}}>
                            <h5 class="card-header">By: {comment.username}</h5>
                            <div class="card-body">
                              <h5 class="card-title">{comment.comment}</h5>
                              <p class="card-text fst-italic">{comment.time}</p>
                            </div>
                        </div>
                    </div>
                    )
                })
                }
                        <form onSubmit={addComment} style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1rem'}}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label className="form-label" for = "username">Username: </label>
                                <input required="true" type='text' value={usernameField} onChange={(e) => {setUsernameField(e.target.value)}} className="form-control" name = "username" />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label className="form-label" for = "comment">Comment: </label>
                                <input required="true" type='text' value={commentField} onChange={(e) => {setCommentField(e.target.value)}} className="form-control" name = "comment"/>
                            </div>
                            <button className="btn btn-secondary" type="submit">Add Comment</button>
                        </form>
            </div>
        </div>
    );
};

export default BlogPost;