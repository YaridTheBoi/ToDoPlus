/*Components*/
const btn=document.getElementById("forgotPassword-form")
const formDiv=document.getElementById("mainWindow")
const succPop=document.getElementById("succPop")
const input=document.getElementById("email-field")
const backBtn=document.getElementById('back-btn')
backBtn.addEventListener("click", function(e){
    window.location.href="/Frontend/main.html"
})

//make popup disappear
succPop.style.transform="scale(0)";

//when form is fine send it
btn.addEventListener("submit", function(e){
    e.preventDefault()
    ForgotPasswordClick()
})


//send forogot password request
async function ForgotPasswordClick(){
    //data
    let data= {"email": input.value}

    //fetch
    const response= await fetch("http://127.0.0.1:8000/users/forgot-password/", {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    })
    if(!response.ok){
        input.classList.add("invalid-input")  
        throw Error(response.statusText)
    }

    //show popup
    input.classList.remove("invalid-input")
    succPop.style.opacity="1";
    formDiv.style.transform="scale(0)";
    succPop.style.transform="scale(1)";
    








    
}