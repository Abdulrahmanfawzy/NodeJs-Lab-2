import express from "express";
import { connectionDB } from "./DB/connection.js";
import routers from "./modules/posts/posts.route.js";

const server = express();
server.use(express.json());
server.use(routers);

connectionDB();


server.listen(4100 , ()=>{
    console.log("connected");
})