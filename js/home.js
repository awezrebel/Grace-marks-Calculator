const quotesy= document.querySelector(".quote")
const author= document.querySelector(".author")
const button=document.querySelector(".button");
let num=Math.floor(Math.random() * 100);
const contactUs= document.querySelector(".contact")
const heady= document.querySelector(".head")

const navbar= document.querySelector(".nav-bar")
var r = document.querySelector(':root');
const mode= document.querySelector(".mode")




//night mode
mode.addEventListener("click",()=>{
    mode.classList.toggle("light");
    if(mode.classList.contains("light")){

        document.documentElement.style
        
            .setProperty('--primary-color', 'white');
        document.documentElement.style
        
            .setProperty('--secondary-color', '#21427C');
        heady.style.color="21427C"

        mode.src="http://localhost:5000/img/moon.png"
        
        
    }
    else{
        document.documentElement.style
        
            .setProperty('--primary-color', '#21427C');
        document.documentElement.style
        
            .setProperty('--secondary-color', 'white');
        heady.style.color="21427C"
        mode.src="http://localhost:5000/img/sun.png"

    }

})

contactUs.addEventListener("click",(event)=>{
  
     event.preventDefault();
    if(contactUs.classList.contains("active")){
        console.log("pavan");
        document.documentElement.style
    
        .setProperty('--blue', 'circle(50px at 100% 0%)');
        
            heady.style.color="var(--secondary-color)";
            contactUs.style.color="var(--secondary-color)";
    contactUs.classList.remove("active")
   
    
    
    }
else{
    // r.style.setProperty('--blue',s 'circle(1900px at 100% 0%)');
    

    document.documentElement.style
        .setProperty('--blue', 'circle(1900px at 100% 0%)');
         
        
           
            contactUs.classList.add("active")
            setTimeout(()=>{
                heady.style.color="black";
                contactUs.style.color="black";

            },500)

      
  
}
})


async function quotes(){
    const jokes = await fetch('https://type.fit/api/quotes');
    const final= await jokes.json()
    
    quotesy.innerText= final[num].text;
    author.innerText=`~${final[num].author}`;
    num+=1

    
    

}

quotes();

