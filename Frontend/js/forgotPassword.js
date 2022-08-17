const btn=document.getElementById("forgotPassword-form")
const formDiv=document.getElementById("mainWindow")
const succPop=document.getElementById("succPop")
succPop.style.display="none"
formDiv.style.display="flex"
btn.addEventListener("submit", function(e){
    e.preventDefault()
    ForgotPasswordClick()
})

function ForgotPasswordClick(){
    formDiv.style.opacity="0"
    succPop.style.display="flex"
}