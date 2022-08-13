
const registerForm= document.getElementById('register-form')
registerForm.addEventListener("submit", function(e){
    e.preventDefault()
    registerClick()
})


function registerClick(){
    const username=document.getElementById('username-field')
    const email=document.getElementById('email-field')
    const password=document.getElementById('password-field')
    const repeatPassword=document.getElementById('repeatPassword-field')
    if(password.value!=repeatPassword.value){
        console.log("Passwords aren same")
        password.classList.add("invalid-input")
        repeatPassword.classList.add("invalid-input")
        password.value=""
        repeatPassword.value=""
    }else{
        password.classList.remove("invalid-input")
        repeatPassword.classList.remove("invalid-input")
        let result={"username":username.value,"email":email.value ,"password":password.value, "password2":repeatPassword.value};
        console.log(JSON.stringify(result))
        postRegister(result)
    }
}

function postRegister(data){
    fetch("http://127.0.0.1:8000/users/register/" , {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    }).then((response) =>{
        if(!response.ok){
            throw Error (response.statusText)
        }
        return response.json()
    }).then((data)=>{

        console.log(data.user_id)

        return fetch("http://127.0.0.1:8000/users/send-verification/"+data.user_id)
    }).then((response)=>{
        if(!response.ok){
            console.log("bad")
        }else{
            console.log("ok")
        }
    }).catch((error)=> {
        console.log(error.body)

    });
}

function sendVerification(id){
    fetch("http://127.0.0.1:8000/users/send-verification/"+ str(id))
    .then((response)=>{
        if(!response.ok){
            console.log("bad")
        }else{
            console.log("ok")
        }
    })
}