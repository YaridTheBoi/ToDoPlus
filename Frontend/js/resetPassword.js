const queryString= window.location.search
const urlParams= new URLSearchParams(queryString)

const token= urlParams.get('token')
const user_id= urlParams.get('user_id')

localStorage.setItem("token", "")
localStorage.setItem("reset-token", token)
localStorage.setItem("reset-user", user_id)

window.history.pushState({},"", '/Frontend/resetPassword.html')

const resetPasswordForm=document.getElementById("resetPassword-form")
resetPasswordForm.addEventListener("submit", function(e){
    e.preventDefault()
    validateResetForm()
})

function validateResetForm(){
    let firstPass= resetPasswordForm.elements["firstPasswordField"]
    let secondPass= resetPasswordForm.elements["secondPasswordField"]

    if(firstPass.value!=secondPass.value){
        firstPass.classList.add('invalid-input')
        secondPass.classList.add('invalid-input')
    }else{
        let request={"password": firstPass.value, "password2":secondPass.value}
        resetPassword(request)
        firstPass.classList.remove('invalid-input')
        secondPass.classList.remove('invalid-input')
        window.location.href="/Frontend/main.html"
    }
}

async function resetPassword(data){
    const response= await fetch("http://127.0.0.1:8000/users/reset-password/"+ localStorage.getItem('reset-token')+ "/"+localStorage.getItem('reset-user'),{
        method:"POST",
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify(data)
    })
    if(!response.ok){
        throw Error(response.statusText)
    }
    localStorage.setItem("reset-token", "")
    localStorage.setItem("reset-user", "")
    
}