import React, {useState, useEffect} from 'react'
import {Container, PostForm} from '../components/index'
import appwriteService from '../appwrite/config'

function EditPost() {

    const [posts, SetPosts] = useState(); 
    const {slug} = useParams(); 
    const navigate = useNavigate() ; 

    useEffect(()=>{

        if(slug)
        {
            appwriteService.getPost(slug).then((post)=>{

                setPosts(post); 

            })
        }
        else
        {
            navigate("/"); 
        }
    },[slug, navigate])
  return post ? (
    <div className='py-8' >

        <Container>

            <PostForm post = {post} /> 
        </Container>


      
    </div>
  ) : null 
}

export default EditPost
