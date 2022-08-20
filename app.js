var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

api_key = "e463dac6a60cb4c22df38e5757200542"
base_url="http://api.openweathermap.org/data/2.5/weather?"
  

app.get("/",function(req,res){
    res.render("index");
})

app.post("/location",function(req,res){
    var city_name=req.body.location;
    complete_url = base_url + "appid=" + api_key + "&q=" + city_name ; 

    request(complete_url,function(error, response, body){
	   if(!error && response.statusCode ==200){
           var data = JSON.parse(body);
           if(data==null){
               res.redirect("/");
           }
		  res.render("index",{data:data})
	   }
	   else{
		  console.log(error)
	   }
    })
})

const PORT=process.env.PORT||2000

app.listen(PORT,function(err){
    if (err) console.log(err);
    else console.log("server has started at port no "+PORT);
})
