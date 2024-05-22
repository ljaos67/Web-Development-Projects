import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = process.env.CURRENTS_API_KEY;
let newsItemsArr = [];
let currentIndex = 0;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) =>{
    res.render("index.ejs");
});

app.post("/populateNews", async (req, res) => {
    if(newsItemsArr.length == 0)
    {
        try {
        const response =  await axios.get("https://api.currentsapi.services/v1/search?category=technology", {
          params: {apiKey: apiKey},
        });
        newsItemsArr = response.data.news;
        console.log(newsItemsArr[currentIndex]);
        res.render("index.ejs",{newsItem:newsItemsArr[currentIndex]});
        if(currentIndex < newsItemsArr.length)
        {
            currentIndex++;
        }
        } catch (error) {
        console.error("Failed to make request:", error.message);
        }
    }
    else
    {
        console.log(newsItemsArr[currentIndex]);
        res.render("index.ejs",{newsItem:newsItemsArr[currentIndex]});
        if(currentIndex < newsItemsArr.length)
        {
            currentIndex++;
        }
    }
  });

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
