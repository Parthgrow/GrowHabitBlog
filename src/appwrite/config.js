import conf from '../conf/conf.js'; 
import { Client,ID, Databases, Storage, Query} from 'appwrite';

export class Service {
    client = new Client(); 
    databases ; 
    bucket ; 

    constructor()
    {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setEndpoint(conf.appwriteProjectId);
        this.databases = new Databases(this.client); 
        this.bucket = new Storage(this.client); 

    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {

            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId

                })
            
        } catch (error) {
            console.log("Appwrite service :: create post :: error ");
            
        }
    }

    async updatePost(slug,{title, content, featuredImage, status})
    {
        try {

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                  


                }
            )
            
        } catch (error) {

            console.log("Appwrite error :: update post :: error ")
            
        }
    }

    // this one is slightly different : you are not changing anything here but deleting it completing so you return a true value just to tell that 
    // -> operation happened successful 

    async deletePost(slug)
    {
        try {

            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true ; 
            
        } catch (error) {

            console.log("Appwrite :: delete post :: error "); 
            return false ; 
            
        }
    }

    async getPost(slug)
    {
        try {

            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite :: getPost :: error"); 
            return false ; 
            
        }

    }

    async getPosts (queries = [Query.equal("status","active") ])
    {
        try {

            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries

            )
            
        } catch (error) {
            console.log("Appwrite :: getPosts :: error"); 
        }
    }

    async uploadFile(file)
    {
        try {

            return await this.bucket.createFile(
                conf.bucket,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("Appwrite :: upload file :: error"); 
            return false ; // ^^ How do I know that when I need to return and when not to 

            
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

  

    

}

const service = new Service(); 
export default service 
