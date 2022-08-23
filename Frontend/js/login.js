const username=document.getElementById("username-field");
const password=document.getElementById("password-field");
const loginFrom= document.getElementById('login-form')
loginFrom.addEventListener("submit", function(e){
    e.preventDefault()
    loginClick()
})


function loginClick(){
    

    let result={"login":username.value, "password":password.value};
    console.log(JSON.stringify(result))
    postLogin(result)
}

async function postLogin(data){
    
    const response= await fetch("http://127.0.0.1:8000/users/login/" , {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    })
    
    if(!response.ok){
            
        username.classList.add('invalid-input')
        password.classList.add('invalid-input')
        throw Error (response.statusText)
    }
    username.classList.remove('invalid-input')
    password.classList.remove('invalid-input')
    let data= response.json()
    localStorage.setItem("token", data.token)
    console.log(data)
    window.location.href="/Frontend/main.html"
        

}