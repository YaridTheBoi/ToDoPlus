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

function postLogin(data){
    
    fetch("http://127.0.0.1:8000/users/login/" , {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    }).then((response) =>{
        if(!response.ok){
            
            username.classList.add('invalid-input')
            password.classList.add('invalid-input')
            throw Error (response.statusText)
        }
        username.classList.remove('invalid-input')
        password.classList.remove('invalid-input')
        return response.json()
    }).then((data)=>{
        localStorage.setItem("token", data.token)
        console.log(data)
        window.location.href="/Frontend/main.html"
        //console.log(localStorage.getItem('token'))
    }).catch((error)=> {
        console.log(error)
        localStorage.setItem("token", "")

        //window.alert("Incorrect password or username")
    });
}