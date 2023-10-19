import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 4000;
const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) =>{
    res.render("index.ejs", {content: "empty"});
   
});

const apiURL = "http://api.funtranslations.com/translate/yoda"
app.post("/submit",  async(req, res) =>{
    const inputText = String(req.body.inputText);
    try{
        
        const response = await axios.get(`http://api.funtranslations.com/translate/yoda?text=${inputText}`);
        console.log(response.data);
        
        res.render("index.ejs", {content: response.data.contents.translated});
    }catch(err){
        console.log(err.message);
    }

    // res.render("index.ejs", {content: inputText});


    
 });



app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})