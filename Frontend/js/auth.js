function loginClick(){
    var username=document.getElementById("username-field").value;
    var password=document.getElementById("password-field").value;
    let result={"login":username, "password":password};
    console.log(JSON.stringify(result))
    postLogin(result)
}

function postLogin(data){
    fetch("http://127.0.0.1:8000/users/login/" , {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    }).then((response) =>{
        return response.json()
    }).then((data)=>{
        localStorage.setItem("token", data.token)
        localStorage.setItem("session", data.session)
        console.log(data)
        //console.log(localStorage.getItem('token'))
    });
}

function logout(){
    console.log("logging out")
    console.log(localStorage.getItem('token'))
    fetch("http://127.0.0.1:8000/users/logout/"+ localStorage.getItem('token')+"/"+localStorage.getItem('session'))
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
