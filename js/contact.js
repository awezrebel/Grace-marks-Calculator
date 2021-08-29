const container= document.querySelector(".image")
const aboutUs= document.querySelector(".about-us")
const imgContainer= document.querySelector(".creator-container")
const buttonContainer= document.querySelector(".creator-btns")

//event-listeners
aboutUs.addEventListener("click",()=>
{
    container.style.opacity = 0.5;
    buttonContainer.style.left= "0rem"
    imgContainer.style.right="10rem"
})