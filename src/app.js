const path= require('path');
const express= require('express');
const hbs=require('hbs');
const forecast= require('./utils/forecast');

const app =express();
const port= process.env.PORT || 3000

// Define path for express config
const publicDir= path.join(__dirname,'../public');
const viewsPath= path.join(__dirname,'../templates/views');
const partialsPath= path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Mayank Modi',
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Mayank Modi',
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Mayank Modi',
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Must provide an address",
        })
    }
    // res.send({
    //     forecast:"It is raining.",
    //     address: req.query.address,
    // });
    forecast(req.query.address,(error,data)=>{
        if(error){
            return res.send({error});
        }
        res.send({
            forecast: data.forecast,
            location: data.location,
            localtime: data.localtime,
            address: req.query.address,
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error: "Must provide a query to search",
        })
    }else{
        console.log(req.query);
        res.send({
            products: [],
        })
    }
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        error_message:"Page doesn't exist!",
        title: "404",
        name: "Mayank Modi",
    });
})

app.get('*',(req,res)=>{
    res.render('404',{
        error_message:"Page Not Found!",
        title: "404",
        name: "Mayank Modi",
    });
})

app.listen(port,()=>{
    console.log("Server started at port "+port);
    
});