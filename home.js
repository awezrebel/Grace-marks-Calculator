const contactUs= document.querySelector(".contact")
const heady= document.querySelector(".head")

const navbar= document.querySelector(".nav-bar")
var r = document.querySelector(':root');

contactUs.addEventListener("click",(event)=>{
  
     event.preventDefault();
    if(contactUs.classList.contains("active")){
        console.log("pavan");
        document.documentElement.style
    
        .setProperty('--blue', 'circle(50px at 100% 0%)');
        
            heady.style.color="white";
            contactUs.style.color="white";
    contactUs.classList.remove("active")
   
    
    
    }
else{
    // r.style.setProperty('--blue', 'circle(1900px at 100% 0%)');
    

    document.documentElement.style
        .setProperty('--blue', 'circle(1900px at 100% 0%)');
         
        
           
            contactUs.classList.add("active")
            setTimeout(()=>{
                heady.style.color="black";
                contactUs.style.color="black";

            },500)

      
        

 
    
}
})

