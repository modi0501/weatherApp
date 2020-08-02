const request= require('request');
const forecast=(address,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=b0a51ac31362cbe37471f410889c5e20&query=${encodeURIComponent(address)}&units=m`;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined);
        }else if(body.error){
            callback('Unable to find location. Try another search!',undefined);
        }else{
            const data= body
            callback(undefined,{
                // latitude: data.lat,
                // longitude: data.lon,
                location: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
                localtime: data.location.localtime,
                forecast: `${data.current.weather_descriptions[0]}. It is ${data.current.temperature} degrees out there.`,
            });
        }
    })
}

module.exports=forecast;