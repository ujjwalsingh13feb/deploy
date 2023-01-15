const express = require('express');
const cors = require('cors');

require('dotenv').config()
const PORT=process.env.port

const {connect}=require("./configs/db");
const {userRoute}=require("./Routes/user.route");
const {noteRoute}=require("./Routes/Note.route");
const {Authentication}=require("./middlewere/note.middlewere");

const app = express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.use("/user",userRoute)
app.use(Authentication)
app.use("/note",noteRoute)


app.listen(PORT,async() => {
    try {
     await connect
     console.log('connected to database successfully');
    } catch (error) {
        console.log({"msg": "something went worng"})
        console.log(error)

    }
    console.log(`app listening on port ${PORT}`)
})



