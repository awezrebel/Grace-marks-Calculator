const slidercontainer= document.querySelector(".slider-container")
const rightslider= document.querySelector(".right-slide")
const leftslider= document.querySelector(".left-slide")
const jumptosignin= document.querySelector(".go-to-sign-in")
const jumptosignup= document.querySelector(".go-to-sign-up")
let activeSlideIndex=0

leftslider.style.top=  `0vh`
rightslider.style.top=  `-100vh`
jumptosignin.addEventListener("click",()=>slidedown("down"))
jumptosignup.addEventListener("click",()=>slideUp("down"))
const slidedown= (direction)=>{
    const sliderHeight= slidercontainer.clientHeight
    if(leftslider.style.top=="-100vh"){
        leftslider.style.top=`0vh`
        

    }
    if(rightslider.style.top=="0vh"){
        rightslider.style.top=`-100vh`
        

    }


}
const slideUp= (direction)=>{
    const sliderHeight= slidercontainer.clientHeight
    if(leftslider.style.top=="0vh"){
        leftslider.style.top=`-100vh`
        

    }
    if(rightslider.style.top=="-100vh"){
        rightslider.style.top=`0vh`
        

    }


}
