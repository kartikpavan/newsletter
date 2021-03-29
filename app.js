const express=require("express");
const https=require("https");

const app=express();
app.use(express.urlencoded({extended:true}));

// for server to use static files like css and images there is a special express function!!
app.use(express.static("public"));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");

})

app.post("/",function(req,res){

    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.mail;

    var data={
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME:lastname
                }
            }
        ]
    }

    var jsonData=JSON.stringify(data);

    const url="https://us1.api.mailchimp.com/3.0/lists/9ffab4b652"

    const options={
        method:"POST",
        auth:"kartik:15a80658813544adfebcfc448e020e04-us1"
    }

    const request=https.request(url,options,function(response){

       if(response.statusCode === 200){
           res.sendFile(__dirname+"/success.html");
       }
       else{
           res.sendFile(__dirname+"/failure.html");
    }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    });
    request.write(jsonData);
    request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.post("/success",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server running on port 3000");
})


// API kEY 15a80658813544adfebcfc448e020e04-us1
// List id 9ffab4b652