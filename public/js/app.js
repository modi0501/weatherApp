

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then(data=>{
//         console.log(data);
//     })
// })



const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const location1=document.querySelector('#location');
const forecast= document.querySelector('#forecast');
const local=document.querySelector('#localtime')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log("Done");
    location1.textContent="Loading...";
    forecast.textContent='';
    local.textContent='';
    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response)=>{
        response.json().then(data=>{
            if(data.error){
                console.log(data.error);
                location1.textContent=data.error;
                
            }
            else{
                console.log(data.forecast);
                // console.log(data.address);
                location1.textContent=data.location;
                local.textContent=data.localtime;
                forecast.textContent=data.forecast;
            }
        })
    })


})
