const btn=document.getElementById("forgotPassword-form")
const formDiv=document.getElementById("mainWindow")
const succPop=document.getElementById("succPop")

succPop.style.transform="scale(0)";
btn.addEventListener("submit", function(e){
    e.preventDefault()
    ForgotPasswordClick()
})

function ForgotPasswordClick(){
    
    formDiv.style.transform="scale(0)";
    succPop.style.transform="scale(1)";
    
}