const btn=document.getElementById("forgotPassword-form")
const formDiv=document.getElementById("mainWindow")
const succPop=document.getElementById("succPop")
const input=document.getElementById("email-field")
succPop.style.transform="scale(0)";
btn.addEventListener("submit", function(e){
    e.preventDefault()
    ForgotPasswordClick()
})

function ForgotPasswordClick(){
    let data= {"email": input.value}

    fetch("http://127.0.0.1:8000/users/forgot-password/", {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    }).then((response)=>{
        if(!response.ok){
            throw Error(response.statusText)

        }
        input.classList.remove("invalid-input")
        succPop.style.opacity="1";
        formDiv.style.transform="scale(0)";
        succPop.style.transform="scale(1)";
        return response.json()
    }).then((data)=>{
        console.log(data)

    }).catch((error)=>{
        console.log(error.body)
        input.classList.add("invalid-input")
        
    })





    
}