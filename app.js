const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "ae6cc991b8e9b57589a5b6d7a36e4897";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const imageURL = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";


      res.write("<h3>The Weather is currently " +weatherDescription+"!</h3>");
      res.write("<h1>the temperature in "+query+" is "+ temp +" degrees celsius</h1>");
      res.write("<img src="  + imageURL+">");
      res.send();

    });
  });
});


app.listen("3000",function(){
  console.log("server is running on port 3000!")
});
