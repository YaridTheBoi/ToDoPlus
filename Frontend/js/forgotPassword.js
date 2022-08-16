const btn=document.getElementById("forgotPassword-form")
const formDiv=document.getElementById("mainWindow")
btn.addEventListener("submit", function(e){
    e.preventDefault()
    ForgotPasswordClick()
})

function ForgotPasswordClick(){
    formDiv.style.display="none"
}