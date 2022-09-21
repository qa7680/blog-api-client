import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeCard from './homeCard';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import '../styling/main.css';

const Homepage = () => {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //fetch all posts
    useEffect(() => {
        setIsLoading(true);
        fetch('https://powerful-sands-70177.herokuapp.com/api/posts', {mode:'cors', method:'GET'})
            .then(res => res.json())
            .then(data => {
                setPosts(data.all_posts.map(post => {
                    return {...post, time: DateTime.fromISO(post.time).setLocale('en').toFormat('ff')}
                }))
                setIsLoading(false);
            });
    }, [])

    return(
        <div className='p-3 mb-2 text-dark' style={{ display: 'flex', flexDirection: 'column' }}>
             {isLoading == true ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></div> :
             <div>
        <HomeCard />
        <div style={{display: 'flex' , margin: '2rem 0rem 0rem rem', gap: '1rem', justifyContent: 'center'}} >
            {posts.map((post) => {
                if(post.published){ 
            return (
                <Link to = {`/posts/${post._id}`} style={{ textDecoration: 'none', color:'inherit'}}>
                    <Card style = {{width: '18rem', border: '1px solid black'}}>
                        <Card.Body style={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"> { post.time }</Card.Subtitle>
                            <p>Published by: Admin</p>
                            <button type="button" class="btn btn-primary">Click to View Blog Post!</button>
                        </Card.Body>
                    </Card>
                </Link>
            )
            }

        })}
       </div>
       </div>
        }
       </div>
    );
};

export default Homepage;