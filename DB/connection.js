import mongoose from "mongoose";

export const connectionDB = async()=>{
    return await mongoose.connect("mongodb://localhost:27017/posts")
    .then(()=>{
        console.log("database connected");
    })
    .catch(err=>{
        console.log("database failure");
    })
}