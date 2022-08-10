function loginClick(){
    var username=document.getElementById("username-field").value;
    var password=document.getElementById("password-field").value;
    let result={"login":username, "password":password};
    console.log(JSON.stringify(result))
    postLogin(result)
}

function postLogin(data){
    console.log("posting login");
    fetch("http://127.0.0.1:8000/users/login/" , {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    }).then((response) =>{
        if(!response.ok){
            throw Error (response.statusText)
        }
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

function registerClick(){
    var username=document.getElementById('username-field')
    var email=document.getElementById('email-field')
    var password=document.getElementById('password-field')
    var repeatPassword=document.getElementById('repeatPassword-field')
    if(password!=repeatPassword){
        alert("Passwords must be same!")
    }
}

function postRegister(data){
    
}




function logout(){
    console.log("logging out")
    console.log(localStorage.getItem('token'))
    fetch("http://127.0.0.1:8000/users/logout/"+ localStorage.getItem('token'))
    .then((response)=>{
        console.log(response)
        localStorage.setItem("token", "")

    })
}

function checkLogin(){
    var loginLink=document.getElementById("login-link")
    console.log(localStorage.getItem('token') )
    
    if(localStorage.getItem('token') != ""){
        loginLink.innerHTML="LOGOUT"
        loginLink.addEventListener("click", logout)
        
    }else{
        loginLink.innerHTML="LOGIN"
        loginLink.removeEventListener("click", logout)
    }

    
}


