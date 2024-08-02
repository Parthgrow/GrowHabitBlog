import React, { useEffect } from 'react'
import appwriteService from '../appwrite/config'
import {Container, PostForm } from "../components/index"


function AddPost() {

    useEffect(()=>{},[]); 
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
      
    </div>
  )
}

export default AddPost
