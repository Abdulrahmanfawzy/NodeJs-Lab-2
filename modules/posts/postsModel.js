import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title: String,
    description: String
})

export const postModel = mongoose.model('posts' , postSchema); 