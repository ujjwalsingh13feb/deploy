const  {noteModel}=require('../models/note.model');
const express = require('express');
const noteRoute = express.Router();



noteRoute.get('/',async(req,res)=>{
    const notes= req.query
    try {
        const NewNote= await noteModel.find(notes)
        res.send(NewNote)
    } catch (error) {
        console.log(error);
        res.send({"mas":"something went wrong with get route"});
    }
});



noteRoute.post('/create',async(req,res)=>{
    const payload = req.body;
   try {
    const new_notes = new noteModel(payload);
    await new_notes.save();
    res.send("created the node");
   } catch (error) {
    console.log(error);
    res.send({"mass":"something went wrong with notes post"});
   }
});




noteRoute.patch('/update/:id',async(req,res)=>{
    const id = req.params.id;
    const payload = req.body;
    const note = await noteModel.findOne({"_id":id});
    const userID_in_Note = note.userID;
    const userID_making_req = req.body.userID
    try {
        // if("userID who is making request"==="UserID in that particular database_document"){}
        if(userID_making_req!==userID_in_Note){
         res.send({"message":"You are not authorized"})
        }else{
            const notes = await noteModel.findOneAndUpdate({ _id: id },payload)
            console.log(notes);
            res.send("all the updates have been done");
        }
        
    } catch (error) {
        console.log(error);
        res.send({"message":"Something went wrong with notes patch"});
    }
   
});



noteRoute.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    const note = await noteModel.findOne({"_id":id});
    const userID_in_Note = note.userID;
    const userID_making_req = req.body.userID
    try {
        // if("userID who is making request"==="UserID in that particular database_document"){}
        if(userID_making_req!==userID_in_Note){
         res.send({"message":"You are not authorized"})
        }else{
            const notes = await noteModel.findOneAndDelete({ _id: id })
            console.log(notes);
            res.send("The deleted request has been done successfully");
        }
        
    } catch (error) {
        console.log(error);
        res.send({"message":"Something went wrong with notes delete request"});
    }
   
    
});

module.exports = {
    noteRoute
}