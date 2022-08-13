const loginLink=document.getElementById("login-link")
console.log(localStorage.getItem('token') )

if(localStorage.getItem('token') != ""){
    loginLink.innerHTML="LOGOUT"
    loginLink.addEventListener("click", logout)
    
}else{
    loginLink.innerHTML="LOGIN"
    loginLink.removeEventListener("click", logout)
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
